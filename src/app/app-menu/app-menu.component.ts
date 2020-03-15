import { Component, OnInit } from '@angular/core';
import {MenuServiceService} from '../_services/menu-service.service';
import {Menu} from '../_models/Menu';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  menus: Menu[];

  constructor(private menuService: MenuServiceService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenus().subscribe(data => this.menus = data);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }
}
