import {Component, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {Item} from '../_models/Item';
import {ItemsOnCart} from '../_models/ItemsOnCart';
import {Router} from '@angular/router';
import {OrderDetail} from "../_models/OrderDetails";
import {Table} from "../_models/Table";
import {User} from "../_models/User";
import {Role} from "../_models/Role";

import {SunscriptionModalComponent} from "../sunscription-modal/sunscription-modal.component";
import {MatDialog} from "@angular/material/dialog";

interface DialogData {
  email: string;
  phNumber: String;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  email:string;
  phNumber:string;
  items: ItemsOnCart[];
  orderDetail: OrderDetail;
  subtotal = 0;
  totalQue = 0;
  orderStatus = false;
  orderNumber = '';

  constructor(private cartService: OrderService,
              private router: Router,
              private dialog: MatDialog) { }



  ngOnInit() {
    this.getCartItems();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SunscriptionModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog Data: "+ result)
    });
  }

  public getCartItems() {
    this.items = JSON.parse(localStorage.getItem('cartItem'));
    for (const item of this.items) {
      this.subtotal = this.subtotal + (item.item.price * item.quantity);
      this.totalQue = this.totalQue + item.quantity;
    }
  }
  getNext(item: ItemsOnCart): void {
    item.quantity = item.quantity + 1;
  }
  getPrevious(item: ItemsOnCart): void {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
  }

  getTotalPrice(item: ItemsOnCart): number {
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
    this.orderDetail = new OrderDetail(
      [new User("", "test@test.com", Role.Waiter)],
      this.items,
      null,
      new Table("TB01"));
    console.log('Order Placed with data : ' + JSON.stringify(this.orderDetail));
    this.cartService.placeOrder(this.orderDetail).subscribe(data => this.orderDetail = data);
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
