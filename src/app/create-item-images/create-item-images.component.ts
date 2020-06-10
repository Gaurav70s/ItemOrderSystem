import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ItemService} from "../_services/item.service";
import {Item} from "../_models/Item";

@Component({
  selector: 'app-create-item-images',
  templateUrl: './create-item-images.component.html',
  styleUrls: ['./create-item-images.component.css']
})
export class CreateItemImagesComponent implements OnInit {

  itemImageForm: FormGroup;
  items: Item[];
  loading = false;
  returnUrl: string;
  error = '';
  itemDropdownSettings: IDropdownSettings = {};
  fileToUpload: File = null;
  isSearchActive: boolean = false;
  isCreateActive: boolean = false;
  selectedItem: Item[]=[];

  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private itemService: ItemService,
               private router: Router) { }


  ngOnInit() {
    this.itemImageForm = this.formBuilder.group({
      item : ['', Validators.required],
      itemImage: ['', Validators.required]
    });

    this.getItems();
    this.itemDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      defaultOpen: false
    };

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    console.log(this.itemImageForm.value);
    this.uploadFileToActivity()
  }

  getItems(){
    this.itemService.getAllItems().subscribe(data => this.items=data)
  }

  handleFileInput(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = (event.target as HTMLInputElement).files.item(0);
    }
  }

  uploadFileToActivity() {
    this.itemService.uploadItemImage(this.selectedItem[0].id, this.fileToUpload).subscribe(data => {
      this.isSearchActive= false;
      this.isCreateActive=false;
      this.selectedItem = [];
    }, error => {
      console.log(error);
    });
  }

  delete(){}
  search(){
    this.isSearchActive= true;
    this.isCreateActive=false;
  }

  prepareForCreate() {
    this.selectedItem = [];
    this.isSearchActive= false;
    this.isCreateActive= true;
  }

  edit(item: Item){
    this.selectedItem.push(item)
    this.isSearchActive= false;
    this.isCreateActive= true;
  }

}
