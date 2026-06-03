import { Injectable, NotFoundException } from '@nestjs/common'; 
import { PaymentStatus } from './payment-status.enum';

type Payment = {
  id: number;
  bookingId: number;
  amount: number;
  status: any; 
  createdAt: Date;
};

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];
  private id = 1;

  // 1. CREATE PAYMENT
  create(dto: any) {
    const payment: Payment = {
      id: this.id++,
      bookingId: dto.bookingId,
      amount: dto.amount,
      status: 'SUCCESS', 
      createdAt: new Date(),
    };

    this.payments.push(payment);
    return payment;
  }

  // 👇 2. TAMBAHKAN FUNGSI INI UNTUK MENGAMANKAN GET DETAIL BY ID NGASAL
  findOne(id: number) {
    const payment = this.payments.find((p) => p.id === id);

    if (!payment) {
      throw new NotFoundException(`Payment dengan ID ${id} tidak ditemukan`); // 👈 Auto 404 jika ID ngasal
    }

    return payment;
  }

  // 3. MENGUBAH STATUS MENJADI SUCCESS (Sudah Aman)
  setToSuccess(id: number) {
    const payment = this.findOne(id); // 💡 Tips: Bisa langsung panggil fungsi findOne di atas agar kodenya lebih pendek
    payment.status = 'SUCCESS'; 
    return payment;
  }

  // 4. CANCEL PAYMENT (Sudah Aman)
  cancel(id: number) {
    const payment = this.findOne(id); // 💡 Tips: Menggunakan fungsi findOne yang sama
    payment.status = 'CANCELLED';
    return payment;
  }

  // 5. GET ALL PAYMENTS
  findAll() {
    return this.payments;
  }
}