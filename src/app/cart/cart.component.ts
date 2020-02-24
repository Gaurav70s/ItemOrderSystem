import {Component, OnInit} from '@angular/core';
import {CartService} from '../_services/cart.service';
import {Item} from '../_models/item';
import {ItemOnCart} from '../_models/itemOnCart';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items: ItemOnCart[];
  subtotal = 0;
  totalQue = 0;
  orderStatus = false;
  orderNumber = '';

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    this.getCartItems();
  }

  public getCartItems() {
    this.items = JSON.parse(localStorage.getItem('cartItem'));
    for (const item of this.items) {
      this.subtotal = this.subtotal + (item.item.price * item.quantity);
      this.totalQue = this.totalQue + item.quantity;
    }
  }
  getNext(item: ItemOnCart): void {
    item.quantity = item.quantity + 1;
  }
  getPrevious(item: ItemOnCart): void {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
  }

  getTotalPrice(item: ItemOnCart): number {
    this.subtotal = 0;
    this.totalQue = 0;

    for (const item1 of this.items) {
      this.subtotal = this.subtotal + (item1.item.price * item1.quantity);
      this.totalQue = this.totalQue + item1.quantity;
    }
    return item.item.price * item.quantity;
  }
  deleteItem(item: Item ): void {
    this.items = this.items.filter(h => h.item !== item);
  }
  placeOrder() {
    this.cartService.placeOrder(this.items).subscribe(data => this.orderNumber = data);
    console.log('Order Placed with data : ' + JSON.stringify(this.items));
    this.orderStatus = true;
  }
  getTotalAmount(subTotal: number) {
 return subTotal + this.getCGST(subTotal) + this.getSGST(subTotal) + this.getServiceCharge(subTotal);
  }
  getCGST(subTotal: number) {
    return 0.025 * subTotal;
  }
  getSGST(subTotal: number) {
    return 0.025 * subTotal;
  }
  getServiceCharge(subTotal: number) {
    return 0.05 * subTotal;
  }

}
