import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';

type Seat = {
  id: number;
  seatNumber: string;
  busId: number;
};

@Injectable()
export class SeatService {
  private seats: Seat[] = [];
  private idCounter = 1;

  create(dto: CreateSeatDto) {
    // Simulasi pembuatan data kursi baru
    const newSeat: Seat = { id: this.idCounter++, ...dto };
    this.seats.push(newSeat);
    return {
      message: 'Kursi berhasil ditambahkan!',
      data: newSeat,
    };
  }

  findAll() {
    return this.seats;
  }

  // 1. VALIDASI ID NGASAL SAAT MENCARI SATU DATA
  findOne(id: number) {
    const seat = this.seats.find((s) => s.id === id);
    if (!seat) {
      throw new NotFoundException(`Kursi dengan ID ${id} tidak pernah ada atau belum ditambahkan!`);
    }
    return seat;
  }

  // 2. VALIDASI ID NGASAL SAAT UPDATE DATA
  update(id: number, dto: CreateSeatDto) {
    const seatIndex = this.seats.findIndex((s) => s.id === id);
    if (seatIndex === -1) {
      throw new NotFoundException(`Gagal Update! Kursi dengan ID ${id} tidak ditemukan.`);
    }
    
    this.seats[seatIndex] = { ...this.seats[seatIndex], ...dto };
    return {
      message: `Kursi ID ${id} berhasil diperbarui`,
      data: this.seats[seatIndex],
    };
  }

  // 3. VALIDASI ID NGASAL SAAT HAPUS DATA
  remove(id: number) {
    const seatIndex = this.seats.findIndex((s) => s.id === id);
    if (seatIndex === -1) {
      throw new NotFoundException(`Gagal Hapus! Kursi dengan ID ${id} tidak terdaftar.`);
    }

    this.seats.splice(seatIndex, 1);
    return { message: `Kursi ID ${id} berhasil dihapus dari sistem` };
  }
}