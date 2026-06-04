import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'; // 👈 TAMBAHKAN IMPORT INI

@Module({
  imports: [
    PrismaModule, 
    JwtModule.register({}), // 👈 REGISTER INI AGAR JwtAuthGuard BISA MENGGUNAKAN JwtService DI SEAT MODULE
  ], 
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}