import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BusModule } from './bus/bus.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
import { SeatModule } from './seat/seat.module'; // 👈 Modul seat baru kamu

@Module({
  imports: [
    AuthModule,
    PrismaModule,   // 👈 Pastikan PrismaModule tetap di-import untuk kebutuhan global
    BusModule,
    BookingModule,
    PaymentModule,
    SeatModule,     // 👈 Disatukan di sini agar dikenali oleh NestJS
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}