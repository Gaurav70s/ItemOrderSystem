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
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    listBackgroundColor: `rgb(208, 241, 239)`,
    fontColor: `rgb(8, 54, 71)`,
    backgroundColor: `rgb(208, 241, 239)`,
    selectedListFontColor: `red`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false
};
expandCollapseStatus = 'expand';

  constructor(private menuService: MenuServiceService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menus = JSON.parse( localStorage.getItem("menus"))
    console.log(this.menus)
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }
}
