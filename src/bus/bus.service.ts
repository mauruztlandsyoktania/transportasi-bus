import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'; // 👈 Tambah BadRequestException
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

  // 2. GET SEMUA BUS
  async findAll() {
    return this.prisma.bus.findMany({
      include: {
        bookings: true, 
      },
    });
  }

  // 3. GET DETAIL BUS (Aman dari ID Ngasal)
  async findOne(id: number) {
    const bus = await this.prisma.bus.findUnique({
      where: { id },
      include: {
        bookings: true, 
      },
    });

    if (!bus) {
      throw new NotFoundException(`Bus dengan ID ${id} tidak ditemukan`);
    }

    return bus;
  }

  // 4. EDIT BUS (Aman dari ID Ngasal)
  async update(id: number, updateBusDto: UpdateBusDto) {
    await this.findOne(id); 
    return this.prisma.bus.update({
      where: { id },
      data: updateBusDto,
    });
  }

  // 5. HAPUS BUS (Aman dari ID Ngasal & Aman dari Crash Relasi Data)
  async remove(id: number) {
    const bus = await this.findOne(id); // Ambil data bus beserta data bookings-nya

    // 👇 Cek apakah bus ini sudah pernah dibooking orang
    if (bus.bookings && bus.bookings.length > 0) {
      throw new BadRequestException(
        `Bus dengan ID ${id} tidak dapat dihapus karena sudah memiliki riwayat pemesanan/booking aktif`,
      );
    }

    return this.prisma.bus.delete({
      where: { id },
    });
  }
}