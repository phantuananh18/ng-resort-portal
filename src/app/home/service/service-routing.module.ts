import { UpdateServiceComponent } from './update-service/update-service.component';
import { DetailServiceComponent } from './detail-service/detail-service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    children: [
      {
        path:'',
        component: ListServiceComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        data: {roles: ['MANAGER']},
        component: AddServiceComponent
      },
      {
        path: 'details/:id',
        component: DetailServiceComponent
      },
      {
        path: 'update/:id',
        canActivate: [AuthGuard],
        data: {roles: ['MANAGER']},
        component: UpdateServiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
