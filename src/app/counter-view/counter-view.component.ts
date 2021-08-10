import {Component, OnInit} from '@angular/core';
import {CounterServiceService} from '../_services/counter-service.service';
import {Table} from '../_models/Table';

@Component({
  selector: 'app-counter-view',
  templateUrl: './counter-view.component.html',
  styleUrls: ['./counter-view.component.css']
})
export class CounterViewComponent implements OnInit {
  dashboards: Table[];
  constructor(private counterService: CounterServiceService) { }

  ngOnInit() {
    this.getDashboardData();
    console.log(this.dashboards);
  }

  public getDashboardData() {
    this.counterService.getCounterDashboard().subscribe(data => this.dashboards = data);
  }

}
