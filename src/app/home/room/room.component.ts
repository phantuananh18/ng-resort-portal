import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-room',
  template:`
  <nb-layout>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`
})
export class RoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}