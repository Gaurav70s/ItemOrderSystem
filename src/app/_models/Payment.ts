import {Subscriptions} from "./Subscriptions";
import {BillingDetails} from "./BillingDetails";

export class Payment{
  constructor(paymentMethod: string, data: string, payedAmount: number, enablePayByPoints: boolean, pointsUsed: number, subscription: Subscriptions,billingDetails :BillingDetails) {
    this.paymentMethod = paymentMethod;
    if(paymentMethod== 'CARD')
      this.data = 'XXXX-XXXX-XXXX-' + data;
    else this.data= data;
    this.payedAmount = payedAmount;
    this.enablePayByPoints = enablePayByPoints;
    this.pointsUsed = pointsUsed;
    this.subscription = subscription;
    this.billingDetails = billingDetails;
  }
  paymentMethod: string;
  data: string;
  payedAmount: number;
  enablePayByPoints: boolean;
  pointsUsed: number;
  subscription: Subscriptions;
  billingDetails: BillingDetails;
}
