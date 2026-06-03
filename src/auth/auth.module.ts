import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt-auth.strategy'; // 👈 1. DIUBAH dari JwtAuthStrategy menjadi JwtStrategy

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY_KAMU', // sesuaikan dengan kode kamu
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 👈 2. DIUBAH JUGA DI SINI menjadi JwtStrategy
  exports: [JwtModule], 
})
export class AuthModule {}