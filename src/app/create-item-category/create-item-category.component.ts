import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemCategory} from '../_models/ItemCategory';
import {ItemService} from '../_services/item.service';

const ELEMENT_DATA: ItemCategory[] = [
  {categoryId: 1, categoryName: 'Hydrogen'},
  {categoryId: 2, categoryName: 'Helium'},
  {categoryId: 3, categoryName: 'Lithium'}
];

@Component({
  selector: 'app-create-item-category',
  templateUrl: './create-item-category.component.html',
  styleUrls: ['./create-item-category.component.css']
})
export class CreateItemCategoryComponent implements OnInit {

  itemCatForm: FormGroup;
  loading = false;
  isSubmitted = false;
  // endTime = new Date();
  returnUrl: string;
  error = '';
  categoryForEdit: ItemCategory;
  categories: ItemCategory[] = [];
  displayedColumns: string[] = ['categoryId', 'categoryName', 'action'];
  isSearchActive: boolean = false;
  isCreateActive: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private router: Router) {
  }


  ngOnInit() {
    this.itemCatForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryId: new FormControl()
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.itemCatForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryId: new FormControl()
    });
    this.createAndUpdate(this.categoryForEdit);
    console.log('test test');
    this.isSearchActive = false;
    this.isCreateActive = false;
  }

  delete(id: number) {
    this.itemService.deleteCategory(id).subscribe(data => this.categories = this.categories.filter(data => data.categoryId !== id));
    console.log('deleted id' + id);
  }

  search() {
    this.isSearchActive = true;
    this.isCreateActive = false;
    this.itemService.getAllItemCategory().subscribe(data => this.categories = data);
  }

  edit(category: ItemCategory) {
    this.categoryForEdit = category;
    this.isSearchActive = false;
    this.isCreateActive = true;
  }

  createAndUpdate(itemCategory: ItemCategory) {
    this.isSearchActive = false;
    this.isCreateActive = false;
    if (itemCategory.categoryId == undefined) {
      this.itemService.cerateCategory(itemCategory).subscribe();
    } else {
      this.itemService.updateCategory(itemCategory).subscribe();
    }
    console.log('searched');
  }

  prepareForCreate() {
    this.categoryForEdit = new ItemCategory();
    this.isSearchActive = false;
    this.isCreateActive = true;
  }
}
