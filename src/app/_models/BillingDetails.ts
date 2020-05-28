export class BillingDetails{
  constructor(subTotal: number, sGst: number, cGst: number, serviceCharge: number, totalAmount: number) {
    this.subTotal = subTotal;
    this.stateGst = sGst;
    this.centerGst = cGst;
    this.serviceCharge = serviceCharge;
    this.totalAmount = totalAmount;
  }

  subTotal: number;
  stateGst: number;
  centerGst: number;
  serviceCharge: number;
  totalAmount: number;

}
