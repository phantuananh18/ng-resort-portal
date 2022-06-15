import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking',
  template:`
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class BookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
