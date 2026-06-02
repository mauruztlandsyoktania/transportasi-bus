import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class BusService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. TAMBAH BUS
  async create(createBusDto: CreateBusDto) {
    return this.prisma.bus.create({
      data: createBusDto,
    });
  }

  // 2. GET SEMUA BUS (Termasuk Riwayat Pemesanan/Booking)
  async findAll() {
    return this.prisma.bus.findMany({
      include: {
        bookings: true, // 👈 SESUAIKAN dengan nama relasi booking di schema.prisma milikmu (misal: bookings, Booking, atau transactions)
      },
    });
  }

  // 3. GET DETAIL BUS (Termasuk Riwayat Pemesanan/Booking)
  async findOne(id: number) {
    const bus = await this.prisma.bus.findUnique({
      where: { id },
      include: {
        bookings: true, // 👈 SESUAIKAN dengan nama relasi booking di schema.prisma milikmu
      },
    });

    if (!bus) {
      throw new NotFoundException(`Bus dengan ID ${id} tidak ditemukan`);
    }

    return bus;
  }

  // 4. EDIT BUS
  async update(id: number, updateBusDto: UpdateBusDto) {
    await this.findOne(id); // Cek apakah bus ada
    return this.prisma.bus.update({
      where: { id },
      data: updateBusDto,
    });
  }

  // 5. HAPUS BUS
  async remove(id: number) {
    await this.findOne(id); // Cek apakah bus ada
    return this.prisma.bus.delete({
      where: { id },
    });
  }
}