import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PaymentModule } from './payment.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PaymentModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    NgxMaskModule.forRoot({validation: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
