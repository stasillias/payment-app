import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAllCardTypes, submitPayment } from '../payment.actions';
import { CardType, PaymentDetails } from '../model/payment.model';
import { AppState } from '../model/app.model';
import { selectApplicableCardTypes } from '../payment.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  form: FormGroup;
  cardTypes$: Observable<CardType[]>;
  cardNumberMask = '0000-0000-0000-0000';
  expiryMask = '00/00';
  private cardExpiryRegExp = new RegExp('^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$');
  private nameRegExp = new RegExp('^[a-zA-Z ]+$');

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      cardType: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, this.cardNumberValidator()]),
      cardExpiry: new FormControl('', [Validators.required, Validators.pattern(this.cardExpiryRegExp)]),
      name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegExp), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email])
    });
    this.store.dispatch(loadAllCardTypes());
    this.cardTypes$ = this.store.pipe(
      select(selectApplicableCardTypes)
    );
  }

  cardTypeChanged(): void {
    this.form.controls.cardNumber.updateValueAndValidity();
  }

  submitPayment(): void {
    const paymentDetails = this.getPaymentDetails();
    this.store.dispatch(submitPayment({ paymentDetails }));
  }

  private getPaymentDetails(): PaymentDetails {
    return {
      cardType: this.form.controls.cardType.value,
      cardNumber: this.form.controls.cardNumber.value,
      cardExpiry: this.form.controls.cardExpiry.value,
      name: this.form.controls.name.value,
      email: this.form.controls.email.value
    };
  }

  private cardNumberValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!this.form) {
        return null;
      }
      const digitsRegExp = new RegExp('^\\d+$');
      const amexCardType = 'Amex';
      const requiredLength = this.form.controls.cardType.value === amexCardType ? 15 : 16;
      const value = control.value;
      const isValid = digitsRegExp.test(value) && value.length === requiredLength;
      return isValid ? null : { cardNumber: { value } };
    };
  }
}
