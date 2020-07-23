import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent {
  @Input() productName: string;
  @Input() date: Date;
  @Input() dateFormat: string;
  @Input() amount: number;
  @Input() currency: string;
}
