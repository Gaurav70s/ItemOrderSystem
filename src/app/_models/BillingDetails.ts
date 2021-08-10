import {PaymentMethod} from './PaymentMethod';

export class BillingDetails{


  constructor(subTotal: number, stateGst: number, centerGst: number, serviceCharge: number, totalAmount: number) {
    this.subTotal = subTotal;
    this.stateGst = stateGst;
    this.centerGst = centerGst;
    this.serviceCharge = serviceCharge;
    this.totalAmount = totalAmount;
  }

  invoiceId: number;
  subTotal: number;
  stateGst: number;
  centerGst: number;
  serviceCharge: number;
  totalAmount: number;
  subscriptionPoints: number;
  paymentMethod: PaymentMethod;
  discount: number;
}
