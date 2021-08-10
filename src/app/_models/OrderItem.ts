import {Order} from './Order';
import {Item} from './Item';

export class OrderItem {
  order: Order;
  item: Item;

  constructor(order: Order, item: Item) {
    this.order = order;
    this.item = item;

  }
}
