import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path-nya

@Injectable()
export class BusService {
  constructor(private readonly prisma: PrismaService) {}

  // FIX PERUBAHAN DI SINI: Menyesuaikan dengan model Bus di schema.prisma
  async create(dto: any) {
    return this.prisma.bus.create({
      data: {
        name: dto.name,
        fromCity: dto.fromCity,
        toCity: dto.toCity,
        price: Number(dto.price), // Memastikan bertipe Int/Number
        seats: Number(dto.seats), // Memastikan bertipe Int/Number
      },
    });
  }

  async findAll() {
    return this.prisma.bus.findMany();
  }

  async findOne(id: number) {
    const bus = await this.prisma.bus.findUnique({
      where: { id },
    });
    if (!bus) throw new NotFoundException('Bus not found');
    return bus;
  }

  async update(id: number, dto: any) {
    await this.findOne(id);

    return this.prisma.bus.update({
      where: { id },
      data: {
        name: dto.name,
        fromCity: dto.fromCity,
        toCity: dto.toCity,
        price: dto.price ? Number(dto.price) : undefined,
        seats: dto.seats ? Number(dto.seats) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.bus.delete({
      where: { id },
    });
  }
}