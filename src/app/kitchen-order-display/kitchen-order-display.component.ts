import { Component, OnInit } from '@angular/core';
import {CartService} from '../_services/cart.service';
import {KotDashboard} from '../_models/KotDashboard';

@Component({
  selector: 'app-kitchen-order-display',
  templateUrl: './kitchen-order-display.component.html',
  styleUrls: ['./kitchen-order-display.component.css']
})
export class KitchenOrderDisplayComponent implements OnInit {

  kotDashboard: KotDashboard;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getKotDashboardData();
    console.log('Kot Dashboard: ' + JSON.stringify(this.kotDashboard));
  }

  getKotDashboardData() {
    this.cartService.getKotDashboard().subscribe(data => this.kotDashboard = data);

  }
}
