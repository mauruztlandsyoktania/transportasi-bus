import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  bookingId: number;

  @IsString()
  method: string;
}