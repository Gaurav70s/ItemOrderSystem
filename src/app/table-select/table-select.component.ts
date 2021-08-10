import {Component, OnInit} from '@angular/core';
import {CounterServiceService} from '../_services/counter-service.service';
import {Table} from '../_models/Table';
import {Router} from '@angular/router';
import {Role} from '../_models/Role';
import {LoginUser} from '../_models/LoginUser';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit {

  tables: Table[];
  loginUser: LoginUser;

  constructor(private counterService: CounterServiceService,
              private router: Router) {
  }

  ngOnInit() {

    this.getAvailableTables();
  }

  public getAvailableTables() {
    this.counterService.getAvailableTables().subscribe(data => this.tables = data);
  }

  selectTable(table: Table) {
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.loginUser);
    localStorage.setItem('table', JSON.stringify(table));
    if (this.loginUser.user.role === Role.Waiter) {
      this.router.navigate(['/item']);
    } else if (this.loginUser.user.role === Role.Admin) {
      this.router.navigate(['/table/order']);
    } else {
      this.router.navigate(['/']);
    }


  }
}
