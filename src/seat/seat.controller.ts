import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // 👈 DIUBAH JADI JALUR ABSOLUT (src/)

@ApiTags('Seat (Kursi)')
@ApiBearerAuth('access-token') // Memunculkan gembok token di Swagger untuk modul ini
@UseGuards(JwtAuthGuard)        // MENGUNCI SEMUA ENDPOINT SEAT (Wajib Token User / Admin)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @ApiOperation({ summary: 'Create: Menambahkan nomor kursi baru (Wajib Token)' })
  create(@Body() dto: CreateSeatDto) {
    return this.seatService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Read All: Mengambil semua data kursi (Wajib Token)' })
  findAll() {
    return this.seatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read One: Proteksi ID ngasal (Wajib Token)' })
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update: Proteksi ID ngasal (Wajib Token)' })
  update(@Param('id') id: string, @Body() dto: CreateSeatDto) {
    return this.seatService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete: Proteksi ID ngasal (Wajib Token)' })
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}