import { NbAuthService, NbTokenService, NbTokenStorage } from '@nebular/auth';
import { NbLayoutModule, NbListModule, NbMenuModule, NbSelectModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from './../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbAccessChecker } from '@nebular/security';
import { NotFound404Component } from './not-found404/not-found404.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Forbidden403Component } from './forbidden403/forbidden403.component';


@NgModule({
  declarations: [HomeComponent, NotFound404Component, HomePageComponent, Forbidden403Component],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
  ],
  providers: [NbAuthService, NbTokenService, NbTokenService, NbAccessChecker]
})
export class HomeModule { }
