import { UpdateUsersComponent } from './update-users/update-users.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListUsersComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN', 'MANAGER']},
        component: AddUsersComponent
      },
      {
        path: 'details/:id',
        component: DetailUsersComponent
      },
      {
        path: 'update/:id',
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN', 'MANAGER']},
        component: UpdateUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
