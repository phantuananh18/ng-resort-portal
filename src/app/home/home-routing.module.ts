import { AuthGuard } from './../auth/auth.guard';
import { Forbidden403Component } from './forbidden403/forbidden403.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path:'',
  component: HomeComponent,
  children: [
    {
      path: 'booking',
      canActivate: [AuthGuard],
      data: {roles: ['STAFF', 'MANAGER']},
      loadChildren: () => import('./booking/booking.module')
        .then(m => m.BookingModule)
    },
    {
      path: 'room',
      canActivate: [AuthGuard],
      data: {roles: ['STAFF', 'WAREHOUSE', 'MANAGER']},
      loadChildren: () => import('./room/room.module')
        .then(m => m.RoomModule)
    },
    {
      path: 'staff',
      canActivate: [AuthGuard],
      data: {roles: ['ADMIN', 'MANAGER']},
      loadChildren: () => import('./staff/staff.module')
        .then(m => m.StaffModule)
    },
    {
      path: 'user',
      canActivate: [AuthGuard],
      data: {roles: ['STAFF', 'ADMIN', 'MANAGER']},
      loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule)
    },
    {
      path: 'service',
      canActivate: [AuthGuard],
      data: {roles: ['STAFF', 'MANAGER']},
      loadChildren: () => import('./service/service.module')
      .then(m => m.ServiceModule)
    },
    {
      path: 'supply',
      canActivate: [AuthGuard],
      data: {roles: ['WAREHOUSE', 'MANAGER']},
      loadChildren: () => import('./supply/supply.module')
      .then(m => m.SupplyModule)
    },
    {
      path: 'voucher', 
      canActivate: [AuthGuard],
      data: {roles: ['STAFF', 'MANAGER']},
      loadChildren: () => import('./voucher/voucher.module')
      .then(m => m.VoucherModule)
    },
    { 
      path: '',
      component: HomePageComponent
    },
    {
      path: '403',
      component: Forbidden403Component
    },
    { 
      path: '**', 
      component: NotFound404Component 
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
