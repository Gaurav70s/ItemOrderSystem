import { Component, OnInit } from '@angular/core';
import {CounterDashboard} from "../_models/CounterDashboard";
import {CounterServiceService} from "../_services/counter-service.service";
import {Table} from "../_models/Table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {

  private tables : Table[];
  constructor(private counterService : CounterServiceService,
              private router: Router) { }

  ngOnInit() {

    this.getAvailableTables()
  }

  public getAvailableTables(){
    this.counterService.getAvailableTables().subscribe(data=> this.tables = data)
  }

  selectTable(table: Table){
    localStorage.setItem('table',JSON.stringify(table));
    this.router.navigate(['/item'])
  }
}
