import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  isPaymentSubmitted,
  isPaymentSuccessful,
  paymentResponseMessage,
  paymentInvoiceNumber
} from '../payment.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../model/app.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productName = 'Product Name';
  amount = 102.03;
  currency = 'EUR';
  date = new Date();
  dateFormat = 'MM/dd/yyyy hh:mm:ss';
  isPaymentSubmitted$: Observable<boolean>;
  isPaymentSuccessful$: Observable<boolean>;
  paymentResponseMessage$: Observable<string>;
  paymentInvoiceNumber$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isPaymentSubmitted$ = this.store.pipe(
      select(isPaymentSubmitted)
    );

    this.isPaymentSuccessful$ = this.store.pipe(
      select(isPaymentSuccessful)
    );

    this.paymentResponseMessage$ = this.store.pipe(
      select(paymentResponseMessage)
    );

    this.paymentInvoiceNumber$ = this.store.pipe(
      select(paymentInvoiceNumber)
    );
  }
}
