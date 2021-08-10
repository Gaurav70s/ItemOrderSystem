import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log('Hi..I have reached on Item details');
  }

}
