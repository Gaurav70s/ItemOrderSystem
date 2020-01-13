import {Component, OnInit} from '@angular/core';
import {ItemService} from '../_services/item.service';
import {Item} from '../_models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemService) {
    localStorage.setItem(`cartItem`, '[]');
  }

  ngOnInit() {
    this.getItems();
  }
  getNext(item: Item): void {
    if (item.quantity === undefined) { item.quantity = 0; }
    item.quantity = item.quantity + 1;
  }
  getPrevious(item: Item): void {
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
  }

  getItems(): void {
    this.itemService.getItems().subscribe(data => this.items = data);

  }

  addtocart(item: Item): void {
    console.log(item);
    this.itemService.addToCart(item, item.quantity);
  }
  print(): void {
    console.log('test the crap');
  }
}
