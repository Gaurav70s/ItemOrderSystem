import {Item} from './Item';

export class ItemsOnCart {
  item: Item;
  quantity: number;
  delivered: boolean;

  constructor(item: Item, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
}
