import {Component, OnInit} from '@angular/core';
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
import {Router} from "@angular/router";
import {BillingDetails} from "../_models/BillingDetails";
import {PaymentMethod} from "../_models/PaymentMethod";

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

  payment: Payment;
  orderDetails : OrderDetail[];
  items: ItemsOnCart[]= [];

  todayDate: Date = new Date();
  paymentMethod:string= '';
  value: any =0;
  subscription : Subscriptions;
  table: Table;
  isPointUsed : boolean;
  pointUsed:number;
  otp: number;
  isOtpVerified: boolean;

  constructor(private orderService: OrderService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.table = JSON.parse(localStorage.getItem('table'));
    this.orderService.getOrdersByTable(this.table.tableNo).subscribe(data=> {
      this.payment= data;
      this.payment.billingComponents = this.payment.billingComponents.filter(data => data.calculatedValue != 0)
      this.mergeAllOrders(this.payment.orderDetails);
    });
  }


  mergeAllOrders(orderDetails: OrderDetail[]){

    for(let orderDetail of orderDetails ){
      for(let orderItemsOnCart of orderDetail.itemsOnCart ){
        this.items.push(orderItemsOnCart)
      }
    }
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

  selected(select: string) {
    if( select == 'card') this.paymentMethod = 'CARD';
    else if(select == 'cash') this.paymentMethod = 'CASH';
    else if(select == 'upi') this.paymentMethod = 'UPI';
    this.value= undefined;
  }

  completePayment() {
    this.payment.subscription = this.subscription;
    this.payment.invoiceDetails.paymentMethod = new PaymentMethod(this.paymentMethod, this.value);
    console.log(this.payment);
    this.orderService.updatePayment(this.payment, this.table.tableNo ).subscribe(data=>{
      this.payment.invoiceDetails.invoiceId= data;
      this.router.navigate(['/rating', {invoiceid: this.payment.invoiceDetails.invoiceId}])
    });
  }

  getPoint() {
    if(this.subscription!= undefined){
      this.pointUsed = (this.payment.invoiceDetails.totalAmount > this.subscription.points) ? this.subscription.points : this.payment.invoiceDetails.totalAmount
      return this.pointUsed
    }else return 0

  }

  enablePoints() {
    this.getPoint();
    if(this.isPointUsed){
      this.payment.invoiceDetails.totalAmount = this.payment.invoiceDetails.totalAmount - this.pointUsed;
      this.payment.invoiceDetails.subscriptionPointUsed = this.pointUsed;
    }
  }

  isValid(){
    console.log("valid : " + this.paymentMethod!=undefined && this.value!=undefined +" paymentMethod: "+this.paymentMethod +"value : "+ this.value)
    return !(this.paymentMethod!=undefined && this.value!=undefined);
  }

  getOtp(){
    if(this.isPointUsed){
      this.orderService.getOTP(this.subscription.subscriptionId).subscribe(data=> console.log(data))
    }
  }
  verifyOtp(){
    this.orderService.verifyOtp(this.otp, this.subscription.subscriptionId).subscribe(data => {
      this.isOtpVerified = data
      this.enablePoints();
    })
  }
}
