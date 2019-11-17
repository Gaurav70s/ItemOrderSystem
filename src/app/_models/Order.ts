import {OrderStatus} from "./OrderStatus";
import {Item} from "./item";

export class Order{
  orderNo: number;
  status: OrderStatus;
  items: Item[];
}
