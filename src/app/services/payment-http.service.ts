import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CardType, PaymentDetails, CardTypesResponse, PaymentSubmitResponse } from '../model/payment.model';

@Injectable()
export class PaymentHttpService {
  constructor(
    private http: HttpClient
  ){}

  getAllCardTypes(): Observable<CardType[]> {
    return this.http.get<CardTypesResponse>('http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030')
      .pipe(
        pluck('cardTypes')
      );
  }

  submitPaymentDetails(paymentDetails: PaymentDetails): Observable<PaymentSubmitResponse> {
    return this.http.post<PaymentSubmitResponse>('http://www.mocky.io/v2/5d8de422310000b19d2b517a', { paymentDetails });
  }
}
