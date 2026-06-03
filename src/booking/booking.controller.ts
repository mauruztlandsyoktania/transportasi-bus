import { Controller, Get, Post, Body, Param } from '@nestjs/common'; // 👈 Ditambahkan Param
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'; // 👈 Ditambahkan ApiOperation untuk dokumentasi

@ApiTags('Booking')
@ApiBearerAuth('access-token')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  // 👇 TAMBAHKAN ENDPOINT INI UNTUK MENCARI BERDASARKAN ID & MENANGKAP ID NGASAL
  @Get(':id')
  @ApiOperation({ summary: 'Mencari detail booking berdasarkan ID (Aman dari ID ngasal)' })
  findOne(@Param('id') id: string) {
    // Tanda +id otomatis mengubah string dari URL (misal: "1") menjadi tipe data number (1)
    return this.bookingService.findOne(+id);
  }
}