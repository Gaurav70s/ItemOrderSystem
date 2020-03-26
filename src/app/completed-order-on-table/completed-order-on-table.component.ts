import {Component, OnInit} from '@angular/core';
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {OrderService} from "../_services/order.service";
import {Table} from "../_models/Table";
import {OrderDetail} from "../_models/OrderDetails";


@Component({
  selector: 'app-completed-order-on-table',
  templateUrl: './completed-order-on-table.component.html',
  styleUrls: ['./completed-order-on-table.component.css']
})
export class CompletedOrderOnTableComponent implements OnInit {

  orderDetails: OrderDetail[];
  subtotal = 0;
  totalQue = 0;
  table: Table;


  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.table = JSON.parse(localStorage.getItem('table'));
    this.orderService.getOrdersByTable(this.table.tableNo).subscribe(data => this.orderDetails= data);
  }

  getTotalPrice(item: ItemsOnCart): number {
    return item.item.price * item.quantity;
  }

  getPercentageCompletion(orderDetail: OrderDetail): number{
    const totalQue =  orderDetail.itemsOnCart.length;
    var completedQue =0;
    for( let itemOnCart of orderDetail.itemsOnCart){
      if(itemOnCart.delivered){
        completedQue++;
      }

    }
    return completedQue/totalQue*100;
  }
}
