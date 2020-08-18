import {Component, OnInit} from '@angular/core';
import {Table} from "../_models/Table";
import {OrderService} from "../_services/order.service";
import {Payment} from "../_models/Payment";
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {OrderStatus} from "../_models/OrderStatus";
import {AddOnOptions} from "../_models/AddOnOptions";




@Component({
  selector: 'app-order-on-table',
  templateUrl: './order-on-table.component.html',
  styleUrls: ['./order-on-table.component.scss']
})
export class OrderOnTableComponent implements OnInit {

  paymentList : Payment[];
  table: Table;
  edit: boolean= false;
  discount: number =0.00;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.table = JSON.parse(localStorage.getItem('table'));
    this.orderService.getPaymentsByTable(this.table.tableNo).subscribe(data => this.paymentList= data);
  }

  addComplementaryItem(item: ItemsOnCart) {
    if(item.complimentaryQuantity < item.quantity){
      item.complimentaryQuantity = item.complimentaryQuantity + 1;
    }
  }

  editPayment() {
    this.edit= !this.edit
  }

  savePayment(payment: Payment) {
    this.edit = false;
    payment.invoiceDetails.discountDetails.discount = this.discount;
    //this.recalculateBilling(payment)
    this.orderService.savePayment(payment).subscribe(data => this.orderService.getPaymentsByTable(this.table.tableNo).subscribe(data => this.paymentList= data))
  }
  /*recalculateBilling(payment: Payment) {
    payment.billingDetails.totalAmount = payment.billingDetails.subTotal +
      payment.billingDetails.stateGst + payment.billingDetails.centerGst

  }*/

  removeComplementaryItem(item: ItemsOnCart) {
    if(item.complimentaryQuantity > 0 ){
      item.complimentaryQuantity = item.complimentaryQuantity - 1;
    }
  }

  getOrderStatus(payment: Payment) {
    return payment.orderDetails[0].order.orderStatus != OrderStatus.SETTLED && this.edit;
  }

  getOrderStatusForButton(payment: Payment) {
    return payment.orderDetails[0].order.orderStatus != OrderStatus.SETTLED
  }
  calculateDiscount(){

  }

  getOptions(selected: AddOnOptions[]): string {
    const options = [];
    selected.forEach(data => {
      options.push(data.label)
    })
    return options.toString();
  }
}
