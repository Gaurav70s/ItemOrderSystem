import {Component, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {KotDashboard} from '../_models/KotDashboard';
import {ActiveOrder} from '../_models/ActiveOrder';
import {OrderDetail} from '../_models/OrderDetails';
import {Order} from "../_models/Order";
import {KotOrder} from "../_models/KotOrder";
import {OrderStatus} from "../_models/OrderStatus";
import {Item} from "../_models/Item";
import {OrderItem} from "../_models/OrderItem";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RejectPopupComponent} from "../reject-popup/reject-popup.component";

interface RejectData {
  rejectMessage:string
}

@Component({
  selector: 'app-kitchen-order-display',
  templateUrl: './kitchen-order-display.component.html',
  styleUrls: ['./kitchen-order-display.component.scss']
})
export class KitchenOrderDisplayComponent implements OnInit {
  totalQuantity = 0;
  kotDashboard: KotDashboard;
  activeOrders: ActiveOrder[] = [];
  orders: OrderDetail[];
  constructor(private orderService: OrderService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getKotDashboardData();
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
    this.orderService.getKotDashboard().subscribe(data => {this.activeOrders = data.activeOrders; this.orders = data.newOrders });
  }

  getTotalQuentity(kotOrder: KotOrder[]) {
    this.totalQuantity = 0;
    kotOrder.forEach((odr) => this.totalQuantity = this.totalQuantity + odr.quantity);
    return this.totalQuantity;
  }

  /*createOrderAlert(orders: OrderDetail[]){
    orders.forEach((odr)=> {
      const message = "New Order : "+ odr.order.orderNo +" on table :"+ odr.table.tableNo;
      this.openBottomSheet(message);
    });
  }*/
  approveOrder(order:Order){
    const updatedOrder = new Order(order.orderNo,OrderStatus.ACCEPTED, order.orderId, null );
    this.orderService.updateOrderStatus(updatedOrder).subscribe(data=>this.getKotDashboardData());

  }

  rejectOrder(order:Order){
    this.orderService.updateOrderStatus(order).subscribe(data=> this.getKotDashboardData());

  }
  /*openBottomSheet(message: string) {

    const config = new MatSnackBarConfig();
    config.panelClass = ['background-black'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    this.zone.run(() => {
      this.snackbar.open(message, 'x', config);
    });
*/




    /*let sheetRef =  this.bottomSheet.open(OrderSnackbarComponent, {
      data: orders
    });
    sheetRef.afterDismissed().subscribe( data => {
      console.log('after close data :', data);
      if(data && data.message=='Cancel') {
        alert('Cancel was clicked in bottomsheet');
      } if(data && data.message=='Status') {
        alert('Change Status was clicked in bottomsheet');
      }
    });
  }*/
  updateOrderItemStatus(order: Order, item: Item) {
    this.orderService.updateOrderItemStatus(new OrderItem(order,item)).subscribe(data => this.getKotDashboardData());
  }
}
