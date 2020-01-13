import { Component, OnInit } from '@angular/core';
import {CartService} from '../_services/cart.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  getInvoice() {
    return this.cartService.getInvoice();
  }
}
