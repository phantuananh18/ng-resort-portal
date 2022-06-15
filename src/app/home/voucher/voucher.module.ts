import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher.component';
import { ListVouchersComponent } from './list-vouchers/list-vouchers.component';
import { AddVoucherComponent } from './add-voucher/add-voucher.component';
import { DetailsVoucherComponent } from './details-voucher/details-voucher.component';
import { UpdateVoucherComponent } from './update-voucher/update-voucher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbActionsModule, NbUserModule, NbSelectModule, NbRadioModule, NbDatepickerModule, NbAlertModule, NbListModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DialogModule } from '../../dialog/dialog.module';


@NgModule({
  declarations: [VoucherComponent, ListVouchersComponent, AddVoucherComponent, DetailsVoucherComponent, UpdateVoucherComponent],
  imports: [
    CommonModule,
    VoucherRoutingModule,
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
export class VoucherModule { }
