import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbSelectModule, NbInputModule, NbAccordionModule, NbListModule, NbIconModule, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogResultComponent } from './dialog-result/dialog-result.component';
import { DistributionComponent } from './distribution/distribution.component';
import { CallServiceComponent } from './call-service/call-service.component';
import { InnerHTMLPipe } from '../@theme/pipes';



@NgModule({
  declarations: [
    DialogResultComponent,
    DistributionComponent,
    CallServiceComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    ReactiveFormsModule,
    NbAccordionModule,
    NbListModule,
    NbIconModule,
    NbProgressBarModule
  ]
})
export class DialogModule { }
