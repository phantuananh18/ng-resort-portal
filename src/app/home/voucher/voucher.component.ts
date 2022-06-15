import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-voucher',
  template: `
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class VoucherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
