import {OrderStatus} from './OrderStatus';

export class Order {
  orderNo: number;
  orderStatus: OrderStatus;
  orderId: string;
  rejectedComment: string;
  invoiceId: number;

  constructor(orderNo: number, orderStatus: OrderStatus, orderId: string, rejectedComment: string) {
    this.orderNo = orderNo;
    this.orderStatus = orderStatus;
    this.orderId = orderId;
    this.rejectedComment = rejectedComment;
  }

}
