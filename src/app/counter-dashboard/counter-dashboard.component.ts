import { Component, OnInit } from '@angular/core';
import {CounterServiceService} from "../_services/counter-service.service";
import {CounterDashboard} from "../_models/CounterDashboard";

@Component({
  selector: 'app-counter-dashboard',
  templateUrl: './counter-dashboard.component.html',
  styleUrls: ['./counter-dashboard.component.css']
})
export class CounterDashboardComponent implements OnInit {
  private dashboards : CounterDashboard[];
  constructor(private counterService : CounterServiceService) { }

  ngOnInit() {

    this.getDashboardData()
    console.log(this.dashboards);
  }

  public getDashboardData(){
    this.counterService.getCounterDashboard().subscribe(data=> this.dashboards= data)
  }
}
