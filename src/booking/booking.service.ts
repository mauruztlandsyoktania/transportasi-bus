import { Injectable } from '@nestjs/common';

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
}