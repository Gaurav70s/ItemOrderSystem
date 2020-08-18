import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemsOnCart} from "../_models/ItemsOnCart";
import {ThemePalette} from '@angular/material/core';

class DialogData {
}

@Component({
  selector: 'app-add-on-popup',
  templateUrl: './add-on-popup.component.html',
  styleUrls: ['./add-on-popup.component.css']
})
export class AddOnPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddOnPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public itemOnCart: ItemsOnCart) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }
}
