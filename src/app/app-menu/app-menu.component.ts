import { Component, OnInit } from '@angular/core';
import {MenuServiceService} from '../menu-service.service';
import {Menu} from '../menu';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  menus: Menu[];

  constructor(private menuService: MenuServiceService) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenus().subscribe(data => this.menus = data);
  }
}
