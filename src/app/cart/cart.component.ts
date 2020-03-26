import {Component, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {Item} from '../_models/Item';
import {ItemsOnCart} from '../_models/ItemsOnCart';
import {Router} from '@angular/router';
import {OrderDetail} from "../_models/OrderDetails";
import {Table} from "../_models/Table";
import {User} from "../_models/User";
import {Role} from "../_models/Role";

import {SubscriptionModalComponent} from "../subscription-modal/subscription-modal.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Subscriptions} from "../_models/Subscriptions";

interface DialogData {
  email: string;
  phNumber: string;
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
  subscription : Subscriptions;
  users: User[]= [];

  constructor(private cartService: OrderService,
              private router: Router,
              private dialog: MatDialog) { }



  ngOnInit() {
    this.getCartItems();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      email: '',
      phNumner: ''
    };
    dialogConfig.width ='300px';
    const dialogRef = this.dialog.open(SubscriptionModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      const data = (<DialogData>result);
      const user = new User( data.phNumber,data.email, Role.Customer);
      this.checkSubscription(user);
    });
  }
  private checkSubscription(user:User){
    this.cartService.checkSubscription(user).subscribe(data=> this.subscription= data);
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
    const table: Table  = JSON.parse(localStorage.getItem('table'));
    this.users.push(JSON.parse(localStorage.getItem('currentUser')).user);
    if(this.subscription != undefined) this.users.push(this.subscription.user);
    this.orderDetail = new OrderDetail(
      this.users,
      this.items,
      this.subscription,
      table);
    console.log('Order Placed with data : ' + JSON.stringify(this.orderDetail));
    this.cartService.placeOrder(this.orderDetail).subscribe(data => {
      this.orderDetail = data;
      this.orderStatus = true;
      localStorage.setItem('cartItem','[]');
      this.router.navigate(["/table_order"])
    });
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
