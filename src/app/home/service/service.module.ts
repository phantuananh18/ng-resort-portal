import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbActionsModule, NbUserModule, NbSelectModule, NbRadioModule, NbDatepickerModule, NbAlertModule, NbListModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DialogModule } from '../../dialog/dialog.module';
import { ListServiceComponent } from './list-service/list-service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { DetailServiceComponent } from './detail-service/detail-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { CKEditorModule } from 'ckeditor4-angular'


@NgModule({
  declarations: [ServiceComponent, ListServiceComponent, AddServiceComponent, DetailServiceComponent, UpdateServiceComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
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
    NbSidebarModule.forRoot(),
    CKEditorModule
  ]
})
export class ServiceModule { }
