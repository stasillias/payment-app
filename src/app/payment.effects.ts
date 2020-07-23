import { Injectable } from '@angular/core';
import { Actions, createEffect,  ofType } from '@ngrx/effects';
import { PaymentActions } from './action.types';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaymentHttpService } from './services/payment-http.service';
import { allCardTypesLoaded, paymentSubmitted } from './payment.actions';

@Injectable()
export class PaymentEffects {
  loadCardTypes$ = createEffect(
    () => this.actions$.pipe(
      ofType(PaymentActions.loadAllCardTypes),
      concatMap(() => this.paymentHttpService.getAllCardTypes()),
      map(cardTypes => allCardTypesLoaded({ cardTypes }))
    )
  );

  submitPayment$ = createEffect(
    () => this.actions$.pipe(
      ofType(PaymentActions.submitPayment),
      concatMap((action) =>
        this.paymentHttpService.submitPaymentDetails(action.paymentDetails).pipe(
          map((data) => paymentSubmitted({ paymentSubmitResponse: data })),
          catchError((response) => of(paymentSubmitted({ paymentSubmitResponse: response.error })))
        )
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private paymentHttpService: PaymentHttpService
  ){}
}
