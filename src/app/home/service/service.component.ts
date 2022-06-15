import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-service',
  template: `
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
