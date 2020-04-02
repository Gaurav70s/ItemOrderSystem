import {Subscriptions} from "./Subscriptions";

export class Payment{
  constructor(paymentMethod: string, data: string, payedAmount: number, isPayByPointsEnabled: boolean, pointsUsed: number, subscription: Subscriptions) {
    this.paymentMethod = paymentMethod;
    if(paymentMethod== 'CARD')
      this.data = 'XXXX-XXXX-XXXX-' + data;
    else this.data= data;
    this.payedAmount = payedAmount;
    this.isPayByPointsEnabled = isPayByPointsEnabled;
    this.pointsUsed = pointsUsed;
    this.subscription = subscription;
  }
  paymentMethod: string;
  data: string;
  payedAmount: number;
  isPayByPointsEnabled: boolean;
  pointsUsed: number;
  subscription: Subscriptions;
}
