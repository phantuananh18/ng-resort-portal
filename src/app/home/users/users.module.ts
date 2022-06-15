import { ThemeModule } from './../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbActionsModule, NbUserModule, NbSelectModule, NbRadioModule, NbDatepickerModule, NbAlertModule, NbLayoutModule, NbSidebarModule, NbListModule } from '@nebular/theme';
import { DialogModule } from '../../dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, ListUsersComponent, AddUsersComponent, DetailUsersComponent, UpdateUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbCardModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbSelectModule,
    NbRadioModule,
    NbDatepickerModule,
    DialogModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    ThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot()
  ]
})
export class UsersModule { }
