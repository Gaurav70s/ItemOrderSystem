import {Component, OnInit} from '@angular/core';
import {ItemService} from '../_services/item.service';
import {Item} from '../_models/Item';
import {Ingredient} from '../_models/Ingredient';
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {CategoryWiseItem} from "../_models/CategoryWiseItem";
import {Router} from "@angular/router";
import {Table} from "../_models/Table";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  itemsOnCarts: ItemsOnCart[];
  ingredientString = '';
  categoryWiseItems: CategoryWiseItem[];
  count:number;
  table: Table;

  constructor(private itemService: ItemService,
              private routes: Router) {
    localStorage.setItem(`cartItem`, '[]');
  }

  ngOnInit() {
    this.table = JSON.parse(localStorage.getItem('table'));
    this.getItems();
  }
  getNext(itemsOnCart: ItemsOnCart): void {
    if (itemsOnCart.quantity === undefined) { itemsOnCart.quantity= 0; }
    itemsOnCart.quantity = itemsOnCart.quantity + 1;
  }
  getPrevious(itemsOnCart: ItemsOnCart): void {
    if (itemsOnCart.quantity > 0) {
      itemsOnCart.quantity = itemsOnCart.quantity - 1;
    }
  }

  getItems(): void {
    const itemsOnCart = [];
    this.itemService.getCategoryWiseItems().subscribe(data => {
      this.categoryWiseItems = data;
    });


  }
  getIngredientsList(ingredients: Ingredient[] ) {
    this.ingredientString = '';
    ingredients.forEach((ingredient) => {
      this.ingredientString = this.ingredientString + ingredient.name + ' ';
    });
    console.log('Ingredient String : ' + this.ingredientString);
    return this.ingredientString;
  }

  addtocart(itemOnCart): void {
    this.itemsOnCarts = JSON.parse(localStorage.getItem('cartItem'));
    if(itemOnCart.quantity != 0){
      if (this.itemsOnCarts.findIndex(value => value.item.id === itemOnCart.item.id) !== -1) {
        this.itemsOnCarts = this.itemsOnCarts.filter(value => value.item.id !== itemOnCart.item.id);
      }
      this.itemsOnCarts.push(itemOnCart);
      localStorage.setItem(`cartItem`, JSON.stringify(this.itemsOnCarts));
      console.log(this.itemsOnCarts);
    }
    if(this.itemsOnCarts!= undefined){
      this.count = this.itemsOnCarts.length
    } else{
      this.count =0;
    }
  }

  cartRedirect() {
    this.routes.navigate(['/cart'])
  }


  getSelectedTable() {

  }
}
