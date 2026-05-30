import { IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  busId: number;

  @IsNumber()
  jumlahTiket: number;
}