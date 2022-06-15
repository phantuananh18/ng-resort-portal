import { NbAuthService } from '@nebular/auth';
import { NbIconLibraries } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { MENU_STAFF, MENU_WAREHOUSE, MENU_ADMIN, MENU_MANAGER } from './home-menu';

@Component({
  selector: 'ngx-home',
  styleUrls: ['home.component.scss'],
  template:`
  <ngx-one-column-layout>
    <nb-menu [items]="menu" autoCollapse="true"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>`
})
export class HomeComponent implements OnInit{
  menu:any;
  constructor(
    private iconsLibrary: NbIconLibraries,
    private authService: NbAuthService
  ) {}

  ngOnInit() {
    this.iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerFontPack( 'far', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconsLibrary.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa' });
    this.authService.getToken().subscribe(
      token => {
        switch (token.getPayload().role) {
          case 'STAFF': 
            this.menu = MENU_STAFF;
            break;
          case 'WAREHOUSE': 
            this.menu = MENU_WAREHOUSE;
            break;
          case 'ADMIN': 
            this.menu = MENU_ADMIN;
            break;
          case 'MANAGER': 
            this.menu = MENU_MANAGER;
            break;
        }
      }
    )
  }
}
