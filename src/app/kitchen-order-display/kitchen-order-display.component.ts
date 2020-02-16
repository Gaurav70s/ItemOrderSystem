import { Component, OnInit } from '@angular/core';
import {CartService} from '../_services/cart.service';
import {KotDashboard} from '../_models/KotDashboard';
import {ActiveOrder} from '../_models/ActiveOrder';
import {NewOrder} from '../_models/NewOrder';
import {OrderDetail} from '../_models/OrderDetails';

@Component({
  selector: 'app-kitchen-order-display',
  templateUrl: './kitchen-order-display.component.html',
  styleUrls: ['./kitchen-order-display.component.css']
})
export class KitchenOrderDisplayComponent implements OnInit {
  totalQuantity = 0;
  kotDashboard: KotDashboard;
  activeOrders: ActiveOrder[] = [];
  newOrders: NewOrder[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getKotDashboardData();
  }

  getKotDashboardData() {
    this.cartService.getKotDashboard().subscribe(data => {this.activeOrders = data.activeOrders; this.newOrders = data.newOrders; });
  }

  getTotalQuentity(odrDetails: OrderDetail[]) {
    this.totalQuantity = 0;
    odrDetails.forEach((odr: OrderDetail) => this.totalQuantity = this.totalQuantity + odr.quantity);
    return this.totalQuantity;
  }
}
