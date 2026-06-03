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

  // 👇 SEKARANG SUDAH DISESUAIKAN JADI SUCCESS
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