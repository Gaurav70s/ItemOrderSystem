import {Order} from './Order';
import {Item} from './Item';

export class OrderItem{
  constructor(order: Order, item: Item) {
    this.order =order;
    this.item =item;

  }

  order: Order;
  item: Item;
}
