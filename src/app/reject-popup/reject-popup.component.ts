import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface RejectData {
  rejectMessage: string;
}

@Component({
  selector: 'app-reject-popup',
  templateUrl: './reject-popup.component.html',
  styleUrls: ['./reject-popup.component.css']
})
export class RejectPopupComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<RejectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RejectData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


}
