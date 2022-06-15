import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-supply',
  template: `
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class SupplyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
