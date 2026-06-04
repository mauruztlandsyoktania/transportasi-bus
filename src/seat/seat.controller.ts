import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Seat (Kursi)')
@ApiBearerAuth('access-token') // 👈 MEMBUAT SEMUA ENDPOINT PUNYA IKON GEMBOK DI SWAGGER (VISUAL ONLY)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)        // 👈 HANYA METHOD POST YANG BENAR-BENAR DIKUNCI SECARA SISTEM
  @ApiOperation({ summary: 'Create: Menambahkan nomor kursi baru' })
  create(@Body() dto: CreateSeatDto) {
    return this.seatService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Read All: Mengambil semua data kursi' })
  findAll() {
    return this.seatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read One: Detail kursi berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update: Memperbarui data atau nomor kursi berdasarkan ID' })
  update(@Param('id') id: string, @Body() dto: CreateSeatDto) {
    return this.seatService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete: Menghapus data kursi berdasarkan ID' })
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}