import { Injectable, NotFoundException } from '@nestjs/common'; // 👈 Wajib import NotFoundException

type Booking = {
  id: number;
  userId: number;
  busId: number;
  seatNumber: string;
};

@Injectable()
export class BookingService {
  private bookings: Booking[] = [];
  private id = 1;

  create(dto: any) {
    const booking: Booking = { id: this.id++, ...dto };
    this.bookings.push(booking);
    return booking;
  }

  findAll() {
    return this.bookings;
  }

  // 👇 TAMBAHKAN FUNGSI INI UNTUK MENANGKAP ID NGASAL
  findOne(id: number) {
    const booking = this.bookings.find((b) => b.id === id);

    // Jika hasil pencarian kosong (ID tidak ada di array memory)
    if (!booking) {
      throw new NotFoundException(`Booking dengan ID ${id} tidak ditemukan`); // 👈 Auto error 404
    }

    // Jika ketemu, kembalikan datanya ke controller
    return booking;
  }
}