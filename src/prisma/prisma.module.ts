import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 🔥 INI YANG SERING LUPA
})
export class PrismaModule {}