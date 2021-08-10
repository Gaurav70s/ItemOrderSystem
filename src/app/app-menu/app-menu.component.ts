import {Component, OnInit} from '@angular/core';
import {MenuServiceService} from '../_services/menu-service.service';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {MultilevelNodes} from 'ng-material-multilevel-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {
  appitems: MultilevelNodes[];
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
    this.appitems = JSON.parse( localStorage.getItem('menus'));
    console.log(this.appitems);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);

  }
}
