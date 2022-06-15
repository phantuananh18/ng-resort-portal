import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-users',
  template: `
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
