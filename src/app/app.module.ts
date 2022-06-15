import { environment } from './../environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NgxGalleryModule,
    ThemeModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'user',
          token: {
            class: NbAuthJWTToken,
            key: 'token'
          },
          baseEndpoint: 'https://localhost:44344/api/Auth',
          login: {
            endpoint: '/staff',
            method: 'post',
          }
        }),
      ],
      forms: {
        login: {
          redirectDelay: 10, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'user',  // strategy id key.
          rememberMe: false,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
          redirect: {
            success: '../home',
            failure: null
          },
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 18,
          },
          username: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
        }
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    // {
    //   provide: NbRoleProvider,
    //   useClass: RoleProvider
    // },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
