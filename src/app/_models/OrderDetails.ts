import {Order} from './Order';
import {User} from './User';
import {ItemsOnCart} from './ItemsOnCart';
import {Subscriptions} from './Subscriptions';
import {Table} from './Table';

export class OrderDetail {
  order: Order;
  users: User[];
  itemsOnCart: ItemsOnCart[];
  subscription: Subscriptions;
  table: Table;

  constructor(user: User[],
              itemsOnCart: ItemsOnCart[],
              subscription: Subscriptions,
              table: Table) {
    this.users = user;
    this.itemsOnCart = itemsOnCart;
    this.subscription = subscription;
    this.table = table;
  }
}
