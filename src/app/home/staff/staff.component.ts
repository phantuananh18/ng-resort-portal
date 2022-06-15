import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-staff',
  template: `
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class StaffComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
