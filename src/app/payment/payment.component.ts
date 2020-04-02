import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {OrderService} from "../_services/order.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SubscriptionModalComponent} from "../subscription-modal/subscription-modal.component";
import {Role} from "../_models/Role";
import {Subscriptions} from "../_models/Subscriptions";
import {User} from "../_models/User";
import {Table} from "../_models/Table";
import {OrderDetail} from "../_models/OrderDetails";
import {Payment} from "../_models/Payment";

interface DialogData {
  email: string;
  phNumber: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  orderDetails : OrderDetail[];
  orderNos: String;
  items: ItemsOnCart[]= [];
  subtotal = 0;
  totalQue = 0;
  todayDate: Date = new Date();
  paymentMethod:string= '';
  totalAmount =0;
  value: any =0;
  subscription : Subscriptions;
  table: Table;
  isPointUsed : boolean;
  pointUsed:number;
  invoiceId:number;

  constructor(private orderService: OrderService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.table = JSON.parse(localStorage.getItem('table'));
    this.orderService.getOrdersByTable(this.table.tableNo).subscribe(data=> {
      this.orderDetails= data;
      this.mergeAllOrders(this.orderDetails);
    });

  }


  mergeAllOrders(orderDetails: OrderDetail[]){
    let orderNos: string = '';
    for(let orderDetail of orderDetails ){
      orderNos = orderNos + orderDetail.order.orderNo+ ', ';
      for(let orderItemsOnCart of orderDetail.itemsOnCart ){
        this.items.push(orderItemsOnCart)
      }
    }
    console.log(orderNos);
    console.log(this.items);
    if(this.items!=undefined){
      for (const item of this.items) {
        this.subtotal = this.subtotal + (item.item.price * item.quantity);
        this.totalQue = this.totalQue + item.quantity;
      }
    }
    this.orderNos= orderNos;
    this.getTotalAmount(this.subtotal)
  }

  openDialog(): void {
    console.log('inside');
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
    this.orderService.checkSubscription(user).subscribe(data=> this.subscription= data);
  }

  getTotalAmount(subTotal: number) {
    this.totalAmount = subTotal +
      this.getCGST(subTotal) +
      this.getSGST(subTotal) +
      this.getServiceCharge(subTotal);
    return this.totalAmount;
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
  getTotalPrice(item: ItemsOnCart): number {
    this.subtotal = 0;
    this.totalQue = 0;

    for (const item1 of this.items) {
      this.subtotal = this.subtotal + (item1.item.price * item1.quantity);
      this.totalQue = this.totalQue + item1.quantity;
    }
    return item.item.price * item.quantity;
  }

  selected(select: string) {
    if( select == 'card') this.paymentMethod = 'CARD';
    else if(select == 'cash') this.paymentMethod = 'CASH';
    else if(select == 'upi') this.paymentMethod = 'UPI';


  }

  completePayment() {
    console.log("----->");
    let payment = new Payment(this.paymentMethod, this.value, this.totalAmount, this.isPointUsed, this.pointUsed, this.subscription);
    this.orderService.updatePayment(payment, this.table.tableNo ).subscribe(data=>this.invoiceId= data);
  }

  getPoint() {
     if(this.subscription!= undefined){
      this.pointUsed = (this.totalAmount > this.subscription.points) ? this.subscription.points : this.totalAmount
       return this.pointUsed
     }else return 0

  }

  enablePoints() {

    this.getPoint();
    if(this.isPointUsed)
      this.totalAmount = this.totalAmount - this.pointUsed;
    else
      this.totalAmount = this.totalAmount + this.pointUsed;
  }
}
