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
  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      cardType: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, this.cardNumberValidator()]),
      cardExpiry: new FormControl('', [Validators.required, this.cardExpiryValidator()]),
      name: new FormControl('', [Validators.required, this.nameValidator()]),
      email: new FormControl('', [this.emailValidator()])
    });
    this.store.dispatch(loadAllCardTypes());
    this.cardTypes$ = this.store.pipe(
      select(selectApplicableCardTypes)
    );
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

  private cardExpiryValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      const cardExpiryRegExp = new RegExp('^(0[1-9]|1[0-2]|[1-9])\\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$');
      const isValid = cardExpiryRegExp.test(value);
      return isValid ? null : { cardExpiry: { value } };
    };
  }

  private nameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      const nameRegExp = new RegExp('^[a-zA-Z ]+$');
      const isValid = nameRegExp.test(value) && value.length <= 50;
      return isValid ? null : { name: { value } };
    };
  }

  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const emailRegExp = new RegExp('\\S+@\\S+\\.\\S+');
      const value = control.value;
      const isValid = !value || emailRegExp.test(value);
      return isValid ? null : { email: { value } };
    };
  }
}
