import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ItemAddOn} from '../_models/ItemAddOn';

interface AddonData {
  itemAddon: ItemAddOn[];
}


@Component({
  selector: 'app-addon-modal',
  templateUrl: './addon-modal.component.html',
  styleUrls: ['./addon-modal.component.css']
})
export class AddonModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddonData) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
