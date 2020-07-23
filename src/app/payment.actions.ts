import { createAction, props } from '@ngrx/store';
import { CardType, PaymentDetails, PaymentSubmitResponse } from './model/payment.model';

export const loadAllCardTypes = createAction(
  "[Payment Form] Load All Card Types"
);

export const allCardTypesLoaded = createAction(
  "[Load All Card Types Effect] All Card Types Loaded",
  props<{cardTypes: CardType[]}>()
);

export const submitPayment = createAction(
  "[Payment Form] Submit Payment",
  props<{paymentDetails: PaymentDetails}>()
);

export const paymentSubmitted = createAction(
  "[Submit Payment Effect] Payment Submitted",
  props<{paymentSubmitResponse: PaymentSubmitResponse}>()
);
