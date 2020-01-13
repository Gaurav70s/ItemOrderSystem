import {OrderDetail} from './OrderDetails';

export class ActiveOrder {
  item_id: number;
  item_name: string;
  order: OrderDetail[];
}
