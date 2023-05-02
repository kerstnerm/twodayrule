import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {AngularFireAuthGuardModule} from "@angular/fire/compat/auth-guard";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {popperVariation, provideTippyConfig, tooltipVariation} from "@ngneat/helipopper";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
