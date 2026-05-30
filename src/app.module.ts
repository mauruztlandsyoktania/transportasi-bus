import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BusModule } from './bus/bus.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    BusModule,
    BookingModule,
    PaymentModule,
  ],
})
@Module({
  imports: [AuthModule, PrismaModule, BusModule, BookingModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
