import { Component, OnInit } from '@angular/core';
import {CartService} from '../_services/cart.service';
import {Item} from '../_models/item';
import {R3BaseRefDecoratorDetection} from '@angular/compiler-cli/src/ngtsc/annotations/src/base_def';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items: Item[];
  subtotal = 0;
  totalQue = 0;
  orderStatus = false;
  orderNumber = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCartItems();
  }

  public getCartItems() {
    this.items = JSON.parse(localStorage.getItem("cartItem"));
    for (const item of this.items) {
      this.subtotal = this.subtotal + (item.price * item.quantity);
      this.totalQue = this.totalQue + item.quantity;
    }
  }
  getNext(item: Item): void {
    item.quantity = item.quantity + 1;
  }
  getPrevious(item: Item): void {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
  }

  getTotalPrice(item: Item): number {
    this.subtotal = 0;
    this.totalQue = 0;
    for (const item1 of this.items) {
      this.subtotal = this.subtotal + (item1.price * item1.quantity);
      this.totalQue = this.totalQue + item1.quantity;
    }
    return item.price * item.quantity;
  }
  deleteItem(item: Item ): void {
    this.items = this.items.filter(h => h !== item);
  }
  placeOrder() {
    console.log('Order Placed');
    this.orderStatus = true;
    this.orderNumber = this.orderNumber + 1;
  }
}
