import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusDto {
  @ApiProperty() // 👈 Cukup panggil tanpa menulis @ApiProperty({ example: '...' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty() // 👈 Kosongkan isi dekoratornya
  @IsString()
  @IsNotEmpty()
  fromCity: string;

  @ApiProperty() // 👈 Kosongkan isi dekoratornya
  @IsString()
  @IsNotEmpty()
  toCity: string;

  @ApiProperty() // 👈 Kosongkan isi dekoratornya
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty() // 👈 Kosongkan isi dekoratornya
  @IsNumber()
  @IsNotEmpty()
  seats: number;
}