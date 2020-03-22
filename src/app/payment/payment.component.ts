import { Component, OnInit } from '@angular/core';
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {OrderService} from "../_services/order.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  items: ItemsOnCart[];
  subtotal = 0;
  totalQue = 0;
  todayDate: Date = new Date();
  paymentMethod:string= '';
  totalAmount =0;
  value: any =0;

  constructor(private cartService: OrderService) { }

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('cartItem'));
    for (const item of this.items) {
      this.subtotal = this.subtotal + (item.item.price * item.quantity);
      this.totalQue = this.totalQue + item.quantity;
    }
  }

  getInvoice() {
    return this.cartService.getInvoice();
  }

  getTotalAmount(subTotal: number) {
    this.totalAmount = subTotal + this.getCGST(subTotal) + this.getSGST(subTotal) + this.getServiceCharge(subTotal);
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
}
