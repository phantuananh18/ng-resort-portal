import { AddBookingComponent } from './add-booking/add-booking.component';
import { DetailsBookingComponent } from './details-booking/details-booking.component';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { BookingComponent } from './booking.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: BookingComponent,
    children: [
      {
        path:'',
        component:ListBookingComponent
      },
      {
        path:'details/:id',
        component:DetailsBookingComponent
      },
      {
        path:'new',
        component: AddBookingComponent
      },
      {
        path: 'edit/:id',
        component: AddBookingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
