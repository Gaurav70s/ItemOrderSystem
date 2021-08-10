import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../_services/item.service';
import {Ingredient} from '../_models/Ingredient';
import {IngredientService} from '../_services/ingredient.service';
import {ItemCategory} from '../_models/ItemCategory';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Item} from '../_models/Item';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';
  selectedCategory: ItemCategory[] = [];
  items: Item[];
  ingredients: Ingredient[];
  itemCategories: ItemCategory[];
  cardImageBase64: string;
  file: File;
  ingredientsDropdownSettings: IDropdownSettings = {};
  categoryDropdownSettings: IDropdownSettings = {};
  isSearchActive: boolean = false;
  isCreateActive: boolean = false;
  category: ItemCategory;
  item: Item = new Item();

  constructor(private formBuilder: FormBuilder,
              // private authService: AuthService,
              private itemService: ItemService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: new FormControl(),
      category: new FormControl(),
      ingredients: new FormControl(),
      property: new FormControl()
    });
    this.getIngredients();
    this.getCategory();
    this.ingredientsDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.categoryDropdownSettings = {
      singleSelection: true,
      idField: 'categoryId',
      textField: 'categoryName',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      defaultOpen: false
    };


    console.log(this.ingredients);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    /*var item: Item = this.itemForm.value
    item.category = item.category[0]*/
    console.log('item' + this.item);
    this.createAndUpdate(this.item);
    //this.itemForm.patchValue({category: this.file})
    //this.itemService.createItem(item);
    //console.log(this.itemForm.value);
  }

  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe(data => this.ingredients = data);
    return this.ingredients;
  }

  getCategory() {
    this.itemService.getAllItemCategory().subscribe(data => this.itemCategories = data);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = (event.target as HTMLInputElement).files[0];
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  delete(id: number) {
    this.itemService.deleteItem(id).subscribe(data => this.items = this.items.filter(data => data.id !== id));
    console.log('deleted id' + id);
  }

  search() {
    this.isSearchActive = true;
    this.isCreateActive = false;
    this.itemService.getAllItems().subscribe(data => {
      console.log(JSON.stringify(data));
      this.items = data;
    });
  }

  edit(selectedItem: Item) {
    this.getIngredients();
    this.getCategory();
    this.selectedCategory.push(selectedItem.category);
    this.item = selectedItem;
    this.isSearchActive = false;
    this.isCreateActive = true;
  }

  createAndUpdate(item: Item) {
    if (this.selectedCategory != undefined) {
      item.category = this.selectedCategory[0];
    }
    this.isSearchActive = false;
    this.isCreateActive = false;
    if (item.id == undefined) {
      this.itemService.createItem(item).subscribe(data => this.item = new Item());
    } else {
      this.itemService.updateItem(item).subscribe(data => this.item = new Item());
    }
    console.log('searched');
  }

  prepareForCreate() {
    this.getIngredients();
    this.getCategory();
    this.isSearchActive = false;
    this.isCreateActive = true;
  }

}
