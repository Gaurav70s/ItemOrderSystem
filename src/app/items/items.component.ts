import {Component, OnInit} from '@angular/core';
import {ItemService} from '../_services/item.service';
import {Ingredient} from '../_models/Ingredient';
import {ItemsOnCart} from '../_models/ItemsOnCart';
import {CategoryWiseItem} from '../_models/CategoryWiseItem';
import {Router} from '@angular/router';
import {Table} from '../_models/Table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddOnPopupComponent} from '../add-on-popup/add-on-popup.component';

class  DialogData {
}

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
              private routes: Router,
              private dialog: MatDialog) {
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

  openDialog(itemOnCart: ItemsOnCart): void {
    console.log('inside');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = itemOnCart;
    dialogConfig.width ='600px';
    dialogConfig.maxHeight = '800px'
    const dialogRef = this.dialog.open(AddOnPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("collected data -->"+  result)

      result.item.addons.forEach(addon =>{
        itemOnCart.item.addonsPrice = 0.00
        if(addon.type == 'checkbox'){
          addon.selected = addon.options.filter(option => option.default_selection)
          addon.selected.forEach(addon => itemOnCart.item.addonsPrice = itemOnCart.item.addonsPrice + addon.price)
          console.log("addon checkbox Price --> "+ itemOnCart.item.addonsPrice)
        } else if(addon.type == 'radio'){
          const selected = [];
          selected.push(addon.selected)
          addon.selected = selected;
          addon.selected.forEach(addon => itemOnCart.item.addonsPrice = itemOnCart.item.addonsPrice + addon.price)
          console.log("addon checkbox Price --> "+ itemOnCart.item.addonsPrice)
        }
      })
      this.addtocart(result);
      console.log("modified item on cart -->" + result.toString())

    });
  }
}
