import {PaymentMethod} from "./PaymentMethod";
import {DiscountDetails} from "./DiscountDetails";

export class InvoiceDetails{
  invoiceId: string;
  subscriptionPointUsed: number;
  discountDetails: DiscountDetails;
  totalAmount: number;
  subTotal: number;
  paymentMethod: PaymentMethod;

}
