import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState, selectAll } from './payment.reducers';

const APPLICABLE_CARD_TYPE_VALUES = ['Visa', 'MasterCard', 'Amex'];
const SUCCESSFUL_PAYMENT_RESPONSE_CODE = '00';

const selectPaymentState = createFeatureSelector<PaymentState>("payment");

const selectAllCardTypes = createSelector(
  selectPaymentState,
  selectAll,
);

export const selectApplicableCardTypes = createSelector(
  selectAllCardTypes,
  types => types.filter(type => APPLICABLE_CARD_TYPE_VALUES.includes(type.value))
);

export const isPaymentSubmitted = createSelector(
  selectPaymentState,
  state => !!state.paymentSubmitData
);

export const isPaymentSuccessful = createSelector(
  selectPaymentState,
  state => state.paymentSubmitData.responseCode === SUCCESSFUL_PAYMENT_RESPONSE_CODE
);

export const paymentResponseMessage = createSelector(
  selectPaymentState,
  state => state.paymentSubmitData.responseMessage
);

export const paymentInvoiceNumber = createSelector(
  selectPaymentState,
  state => state.paymentSubmitData.invoiceNo
);
