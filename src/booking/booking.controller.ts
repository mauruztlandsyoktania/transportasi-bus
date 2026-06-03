import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common'; // 👈 Ditambahkan Req
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Booking')
@ApiBearerAuth('access-token')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat booking baru (Validasi otomatis id bus & hitung total harga)' })
  create(@Body() dto: CreateBookingDto, @Req() req: any) {
    // Mengambil userId dari JWT Payload yang divalidasi oleh Guard kamu (misal: req.user.id)
    // Angka 1 di bawah adalah fallback (cadangan) jika endpoint ini dites tanpa login/token
    const userId = req.user?.id || 1; 

    return this.bookingService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Mengambil semua data booking' })
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mencari detail booking berdasarkan ID (Aman dari ID ngasal)' })
  findOne(@Param('id') id: string) {
    // Tanda +id otomatis mengubah string dari URL menjadi tipe data number
    return this.bookingService.findOne(+id);
  }
}