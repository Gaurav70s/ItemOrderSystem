import { Component, OnInit } from '@angular/core';
import {KotDashboard} from "../_models/KotDashboard";
import {ActiveOrder} from "../_models/ActiveOrder";
import {OrderDetail} from "../_models/OrderDetails";
import {OrderService} from "../_services/order.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Order} from "../_models/Order";
import {RejectPopupComponent} from "../reject-popup/reject-popup.component";
import {OrderStatus} from "../_models/OrderStatus";
import {KotOrder} from "../_models/KotOrder";
import {Item} from "../_models/Item";
import {OrderItem} from "../_models/OrderItem";
import {ItemAddOn} from "../_models/ItemAddOn";
import {Subscription, timer} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {AddOnOptions} from "../_models/AddOnOptions";

interface RejectData {
  rejectMessage:string
}

@Component({
  selector: 'app-kot-display',
  templateUrl: './kot-display.component.html',
  styleUrls: ['./kot-display.component.scss']
})
export class KotDisplayComponent implements OnInit {

  subscription: Subscription;
  totalQuantity = 0;
  kotDashboard: KotDashboard;
  activeOrders: ActiveOrder[] = [];
  orders: OrderDetail[];
  //addons: ItemAddOn[] = [new ItemAddOn("Extra Cheese"), new ItemAddOn("Extra Hot")]
  status: boolean = false;
  constructor(private orderService: OrderService,
              private dialog: MatDialog) { }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = timer(0, 1000000).pipe(
      switchMap(() => this.orderService.getKOTOrderData())).subscribe(data=> this.orders= data)
  }

  openDialog(order: Order): void {
    console.log('inside');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      email: '',
      phNumner: ''
    };
    dialogConfig.width ='300px';
    const dialogRef = this.dialog.open(RejectPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      const data = (<RejectData>result);
      console.log(data.rejectMessage)
      const updatedOrder = new Order(order.orderNo,OrderStatus.REJECTED, order.orderId, data.rejectMessage );
      this.rejectOrder(updatedOrder)
    });
  }

  getKotDashboardData() {
    this.orderService.getKOTOrderData().subscribe(data => {
      this.orders= data;
    });
  }

  getTotalQuentity(kotOrder: KotOrder[]) {
    this.totalQuantity = 0;
    kotOrder.forEach((odr) => this.totalQuantity = this.totalQuantity + odr.quantity);
    return this.totalQuantity;
  }

  approveOrder(order:Order){
    const updatedOrder = new Order(order.orderNo,OrderStatus.ACCEPTED, order.orderId, null );
    this.orderService.updateOrderStatus(updatedOrder).subscribe(data=>this.getKotDashboardData());
  }

  rejectOrder(order:Order){
    this.orderService.updateOrderStatus(order).subscribe(data=> this.getKotDashboardData());

  }

  updateOrderStatus(order: Order){
    this.orderService.completeOrder(order).subscribe(data=> this.orders = this.orders.filter(orderBase => {
      orderBase.order.orderId == order.orderId
    }))
  }

  clickEvent(){

  }

  updateOrderItemStatus(order: Order, itemsOnCart: ItemsOnCart) {
    itemsOnCart.delivered = !itemsOnCart.delivered
    this.orderService.updateOrderItemStatus(new OrderItem(order,itemsOnCart.item), itemsOnCart.delivered).subscribe(data => this.getKotDashboardData());
  }

  getOptions(selected: AddOnOptions[]): string {
    const options = [];
    selected.forEach(data => {
      options.push(data.label)
    })
    return options.toString();
  }

}
