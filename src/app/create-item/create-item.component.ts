import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../_services/item.service';
import {Ingredient} from '../_models/Ingredient';
import {IngredientService} from '../_services/ingredient.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemForm: FormGroup;
  loading = false;
  isSubmitted  =  false;
  // endTime = new Date();
  returnUrl: string;
  error = '';
  ingredients: Ingredient[];

  constructor( private formBuilder: FormBuilder,
               // private authService: AuthService,
               private itemService: ItemService,
               private ingredientService: IngredientService,
               private route: ActivatedRoute,
               private router: Router) { }


  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', Validators.required],
      description: new FormControl(),
      category: new FormControl(),
      itemImage: new FormControl(),
      property: new FormControl()
    });

    console.log(this.ingredients);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.itemService.createItem(this.itemForm.value);
    console.log(this.itemForm.value);
  }
  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe(data => this.ingredients = data);
    return this.ingredients;
  }
}
