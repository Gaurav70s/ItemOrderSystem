import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IngredientService} from '../_services/ingredient.service';
import {Ingredient} from '../_models/Ingredient';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredientsForm: FormGroup;
  ingredient: Ingredient;
  isSuccess = false;
  loading = false;
  returnUrl: string;
  error = '';
  isSearchActive: boolean = false;
  isCreateActive: boolean = false;
  ingredientsList: Ingredient[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private ingredientService: IngredientService) {
  }


  ngOnInit() {
    this.ingredientsForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    console.log(this.ingredientsForm.value);
    this.createAndUpdate(this.ingredientsForm.value);
    //this.ingredientService.createIngredient(this.ingredientsForm.value).subscribe(data => this.isSuccess = data );
  }


  delete(id: number) {
    this.ingredientService.deleteIngredients(id).subscribe(data => this.ingredientsList = this.ingredientsList.filter(data => data.id !== id));
    console.log('deleted id' + id);
  }

  search() {
    this.isSearchActive = true;
    this.isCreateActive = false;
    this.ingredientService.getAllIngredients().subscribe(data => this.ingredientsList = data);
  }

  edit(selectedIngredient: Ingredient) {
    this.ingredient = selectedIngredient;
    this.isSearchActive = false;
    this.isCreateActive = true;
  }

  createAndUpdate(ingredient: Ingredient) {
    this.isSearchActive = false;
    this.isCreateActive = false;
    if (ingredient.id == undefined) {
      this.ingredientService.createIngredient(ingredient).subscribe();
    } else {
      this.ingredientService.updateIngredient(ingredient).subscribe();
    }
  }

  prepareForCreate() {
    this.ingredient = new Ingredient();
    this.isSearchActive = false;
    this.isCreateActive = true;
  }
}
