export interface CardTypesResponse {
  cardTypes: CardType[];
}

export interface CardType {
  id: string;
  value: string;
}

export interface PaymentDetails {
  cardType: string;
  cardNumber: string;
  cardExpiry: string;
  name: string;
  email: string;
}

export interface PaymentSubmitResponse extends PaymentSubmitData {
  approvalCode: string;
}

export interface PaymentSubmitData {
  responseCode: string;
  invoiceNo: string;
  responseMessage: string;
}
