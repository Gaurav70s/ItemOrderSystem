import {OrderStatus} from './OrderStatus';

export class Order {
  orderNo: number;
  orderStatus: OrderStatus;
  orderId: string;
  constructor(orderNo: number, status: OrderStatus, orderId:string ) {
    this.orderNo = orderNo;
    this.orderStatus=status;
    this.orderId = orderId;
  }
}
