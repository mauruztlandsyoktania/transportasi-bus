import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { PrismaModule } from '../prisma/prisma.module'; 
import { AuthModule } from '../auth/auth.module'; // 👈 1. TAMBAHKAN IMPORT AUTHMODULE INI

@Module({
  imports: [
    PrismaModule, 
    AuthModule // 👈 2. MASUKKAN AUTHMODULE DI SINI
  ], 
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}