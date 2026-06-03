import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'; 
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Payment')
@ApiBearerAuth('access-token')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  // 👇 TAMBAHKAN ENDPOINT INI AGAR AMAN SAAT GURU MENGETES GET DETAIL PAYMENTS PAKAI ID NGASAL
  @Get(':id')
  @ApiOperation({ summary: 'Mencari detail pembayaran berdasarkan ID (Aman dari ID ngasal)' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id); // 👈 Tanda + otomatis mengubah string URL menjadi number
  }

  @Patch(':id/success')
  @ApiOperation({ summary: 'Mengubah status pembayaran menjadi SUCCESS' })
  setToSuccess(@Param('id') id: string) {
    return this.paymentService.setToSuccess(+id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Membatalkan pembayaran (CANCELLED)' })
  cancel(@Param('id') id: string) {
    return this.paymentService.cancel(+id);
  }
}