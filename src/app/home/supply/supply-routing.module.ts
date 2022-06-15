import { DistributionSupplyComponent } from './distribution-supply/distribution-supply.component';
import { UpdateSupplyComponent } from './update-supply/update-supply.component';
import { DetailsSupplyComponent } from './details-supply/details-supply.component';
import { AddSupplyComponent } from './add-supply/add-supply.component';
import { SupplyComponent } from './supply.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSuppliesComponent } from './list-supplies/list-supplies.component';

const routes: Routes = [
  {
    path: '',
    component: SupplyComponent,
    children: [
      {
        path: '',
        component: ListSuppliesComponent
      },
      {
        path: 'add',
        component: AddSupplyComponent
      },
      {
        path: 'details/:id',
        component: DetailsSupplyComponent
      },
      {
        path: 'update/:id',
        component: UpdateSupplyComponent
      },
      {
        path: 'distribution/:id',
        component: DistributionSupplyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyRoutingModule { }
