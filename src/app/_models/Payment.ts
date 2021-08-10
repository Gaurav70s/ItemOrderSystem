import {Subscriptions} from './Subscriptions';
import {OrderDetail} from './OrderDetails';
import {BillingComponent} from './BillingComponent';
import {InvoiceDetails} from './InvoiceDetails';

export class Payment{
  constructor(subscription: Subscriptions) {
    this.subscription = subscription;
  }

  public setOrderDetails(orderDetails: OrderDetail[]){
    this.orderDetails = orderDetails;
  }
  orderDetails: OrderDetail[];
  subscription: Subscriptions;
  billingComponents: BillingComponent[];
  invoiceDetails: InvoiceDetails;
}
