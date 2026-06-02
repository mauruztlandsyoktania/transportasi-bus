import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { PrismaModule } from '../prisma/prisma.module'; // 👈 1. TAMBAHKAN IMPORT INI (Sesuaikan path folder prisma kamu)

@Module({
  imports: [PrismaModule], // 👈 2. MASUKKAN PRISMAMODULE DI SINI
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}