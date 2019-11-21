import { Component, OnInit } from '@angular/core';
import {CounterDashboard} from '../_models/CounterDashboard';
import {CounterServiceService} from '../_services/counter-service.service';

@Component({
  selector: 'app-counter-view',
  templateUrl: './counter-view.component.html',
  styleUrls: ['./counter-view.component.css']
})
export class CounterViewComponent implements OnInit {
  private dashboards: CounterDashboard[];
  constructor(private counterService: CounterServiceService) { }

  ngOnInit() {
    this.getDashboardData()
    console.log(this.dashboards);
  }

  public getDashboardData() {
    this.counterService.getCounterDashboard().subscribe(data => this.dashboards = data);
  }

}