import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID Booking yang akan dibayar',
    example: 1,
  })
  @IsNumber()
  bookingId: number;

  @ApiProperty({
    description: 'Metode pembayaran yang dipilih',
    example: 'TRANSFER', // Bisa disesuaikan dengan enum kamu (EWALLET, TRANSFER, CASH)
  })
  @IsString()
  method: string;
}