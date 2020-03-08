import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {KitchenOrderDisplayComponent} from "../kitchen-order-display/kitchen-order-display.component";
import {OrderDetail} from "../_models/OrderDetails";

@Component({
  selector: 'app-order.snackbar',
  templateUrl: './order.snackbar.component.html',
  styleUrls: ['./order.snackbar.component.css']
})
export class OrderSnackbarComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<KitchenOrderDisplayComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: OrderDetail[]) {}

  title: string;
  clearBar(): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  changeStatus() {
    this.bottomSheetRef.dismiss({
      message: 'Change Status',
      data: this.data
    });
  }




  ngOnInit(): void {
    console.log('data received', this.data);
  }

}
