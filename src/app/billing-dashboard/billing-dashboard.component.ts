import { Component, OnInit } from '@angular/core';
import {BillingServiceService} from "../billing-service.service";
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from "@angular/material/core";
import {DatePipe, formatDate} from "@angular/common";
import {BillingDashboard} from "../_models/BillingDashboard";

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date,'yyyy-MM-dd',this.locale);
    } else {
      return date.toDateString();
    }
  }
}



@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    DatePipe
  ]
})
export class BillingDashboardComponent implements OnInit {

  constructor(private billingService: BillingServiceService,
              public datepipe: DatePipe) { }
  date : Date = new Date();
  dailyBillingDashboards : BillingDashboard[];
  monthlyBillingDashboards : BillingDashboard[];
  today = new Date();
  sixMonthsAgo = new Date();
  monthYear: Date = new Date();


  ngOnInit(): void {
    this.sixMonthsAgo.setMonth(this.today.getMonth() - 6);
    this.getDailyBillingDashboard(new Date())
    this.getMonthlyBillingDashboard(new Date())

  }

  getDailyBillingDashboard(date: Date){
    console.log(this.datepipe.transform(date,'yyyy-MM-dd').toString())
    this.billingService.getDailyBillingData(this.datepipe.transform(date,'yyyy-MM-dd').toString()).subscribe(data=> this.dailyBillingDashboards = data)

  }

  getMonthlyBillingDashboard(date: Date){
    this.billingService.getMonthlyBillingData(date.getMonth()+1, date.getFullYear()).subscribe(data=> this.monthlyBillingDashboards = data)

  }
}
