import { Injectable, NotFoundException } from '@nestjs/common'; 
import { PaymentStatus } from './payment-status.enum';

type Payment = {
  id: number;
  bookingId: number;
  amount: number;
  status: any; // Menggunakan 'any' atau sesuaikan dengan isi PaymentStatus Anda
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
      status: 'PENDING', // Menggunakan string langsung agar aman
      createdAt: new Date(),
    };

    this.payments.push(payment);
    return payment;
  }

  // 👇 SEKARANG MENGUBAH STATUS MENJADI SUCCESS
  setToSuccess(id: number) {
    const payment = this.payments.find((p) => p.id === id);

    if (!payment) {
      throw new NotFoundException(`Payment dengan ID ${id} tidak ditemukan`);
    }

    payment.status = 'SUCCESS'; // 👈 Langsung di-hardcode ke string 'SUCCESS'
    return payment;
  }

  // CANCEL PAYMENT
  cancel(id: number) {
    const payment = this.payments.find((p) => p.id === id);

    if (!payment) {
      throw new NotFoundException(`Payment dengan ID ${id} tidak ditemukan`);
    }

    payment.status = 'CANCELLED';
    return payment;
  }

  findAll() {
    return this.payments;
  }
}