import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CardType, PaymentSubmitData } from './model/payment.model';
import { PaymentActions } from './action.types';

export interface PaymentState extends EntityState<CardType>{
  paymentSubmitData: PaymentSubmitData;
}

export const adapter = createEntityAdapter<CardType>();

export const initialPaymentState = adapter.getInitialState({
  paymentSubmitData: null
});

export const paymentReducer = createReducer(
  initialPaymentState,

  on(
    PaymentActions.allCardTypesLoaded,
    (state, action)  => adapter.addAll(action.cardTypes, { ...state })
  ),

  on(
    PaymentActions.paymentSubmitted,
    (state, action) => {
      return {
        ...state,
        paymentSubmitData: {
          responseCode: action.paymentSubmitResponse.responseCode,
          invoiceNo: action.paymentSubmitResponse.invoiceNo,
          responseMessage: action.paymentSubmitResponse.responseMessage
        }
      };
    }
  )
);

export const {
  selectAll
} = adapter.getSelectors();
