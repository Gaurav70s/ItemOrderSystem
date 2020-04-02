import {Component, OnInit} from '@angular/core';
import {ItemService} from '../_services/item.service';
import {Item} from '../_models/Item';
import {Ingredient} from '../_models/Ingredient';
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {CategoryWiseItem} from "../_models/CategoryWiseItem";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  itemsOnCarts: ItemsOnCart[];
  ingredientString = '';
  categoryWiseItems: CategoryWiseItem[];

  constructor(private itemService: ItemService) {
    localStorage.setItem(`cartItem`, '[]');
  }

  ngOnInit() {
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
    if(itemOnCart.quantity != 0)
      this.itemService.addToCart(itemOnCart);
  }
  print(): void {
    console.log('test the crap');
  }
}
