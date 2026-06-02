import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module'; // Mengimpor modul Prisma

@Module({
  imports: [
    PrismaModule, // Memasukkan database Prisma ke modul Auth
    JwtModule.register({
      secret: 'secretKey', // Key JWT bawaan kamu
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}