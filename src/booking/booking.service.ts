import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 👈 Sesuaikan dengan letak file prisma.service kamu
import { CreateBookingDto } from './dto/create-booking.dto'; // 👈 Gunakan DTO yang sudah kita buat tadi

@Injectable()
export class BookingService {
  // 1. Inject PrismaService ke dalam constructor
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBookingDto) {
    // 2. Cek apakah Bus dengan ID tersebut benar-benar terdaftar di database MySQL
    const busExist = await this.prisma.bus.findUnique({
      where: { id: dto.busId },
    });

    // 3. Jika Bus tidak ditemukan, langsung lempar error 404 (Gagal diproses)
    if (!busExist) {
      throw new NotFoundException(`Bus dengan ID ${dto.busId} tidak ditemukan!`);
    }

    // 4. Hitung total harga otomatis (Harga tiket bus x jumlah tiket yang dipesan)
    const totalHarga = busExist.price * dto.jumlahTiket;

    // 5. Simpan data booking ke database asli lewat Prisma
    return this.prisma.booking.create({
      data: {
        userId: userId,
        busId: dto.busId,
        jumlahTiket: dto.jumlahTiket,
        totalHarga: totalHarga,
        status: 'PENDING', // Nilai default awal transaksi
      },
    });
  }

  // Mengambil semua data booking dari database MySQL
  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        bus: true,  // Menyertakan data detail bus di dalam responnya
        user: true, // Menyertakan data detail user di dalam responnya
      },
    });
  }

  // Menangkap ID booking ngasal
  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: id },
      include: { bus: true, user: true },
    });

    if (!booking) {
      throw new NotFoundException(`Booking dengan ID ${id} tidak ditemukan`);
    }

    return booking;
  }
}