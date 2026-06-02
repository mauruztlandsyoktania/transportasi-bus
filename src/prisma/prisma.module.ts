import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 Dekorator ini membuat PrismaService bisa dibaca di SEMUA module tanpa perlu kamu import satu-satu lagi!
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Mengekspor agar bisa dipakai di AuthService & BusService
})
export class PrismaModule {}