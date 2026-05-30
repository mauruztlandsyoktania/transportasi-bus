import { Injectable } from '@nestjs/common';
import { PaymentStatus } from './payment-status.enum';

type Payment = {
  id: number;
  bookingId: number;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
};

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];
  private id = 1;

  // CREATE PAYMENT → PENDING
  create(dto: any) {
    const payment: Payment = {
      id: this.id++,
      bookingId: dto.bookingId,
      amount: dto.amount,
      status: PaymentStatus.PENDING,
      createdAt: new Date(),
    };

    this.payments.push(payment);
    return payment;
  }

  // UPDATE STATUS → PAID
  pay(id: number) {
    const payment = this.payments.find((p) => p.id === id);

    if (!payment) {
      return { message: 'Payment not found' };
    }

    payment.status = PaymentStatus.PAID;

    return payment;
  }

  // OPTIONAL: CANCEL PAYMENT
  cancel(id: number) {
    const payment = this.payments.find((p) => p.id === id);

    if (!payment) {
      return { message: 'Payment not found' };
    }

    payment.status = PaymentStatus.CANCELLED;

    return payment;
  }

  findAll() {
    return this.payments;
  }
}