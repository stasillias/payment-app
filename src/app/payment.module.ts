import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from  '@angular/material/input';
import { MatButtonModule } from  '@angular/material/button';

import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { PaymentHttpService } from './services/payment-http.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { paymentReducer } from './payment.reducers';
import { PaymentEffects } from './payment.effects';

@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentInfoComponent,
    PaymentResultComponent
  ],
  exports: [
    PaymentFormComponent,
    PaymentInfoComponent,
    PaymentResultComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('payment', paymentReducer),
    EffectsModule.forFeature([PaymentEffects]),
  ],
  providers: [
    PaymentHttpService
  ]
})
export class PaymentModule {}
