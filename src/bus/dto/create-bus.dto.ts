import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusDto {
  @ApiProperty({ example: 'Harapan Jaya', description: 'Nama PO Bus' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Jakarta', description: 'Kota Asal' })
  @IsString()
  @IsNotEmpty()
  fromCity: string;

  @ApiProperty({ example: 'Surabaya', description: 'Kota Tujuan' })
  @IsString()
  @IsNotEmpty()
  toCity: string;

  @ApiProperty({ example: 350000, description: 'Harga Tiket Bus' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  // 👈 KODINGAN INI YANG MEMBUAT SEATS OTOMATIS MUNCUL DI SWAGGER
  @ApiProperty({ example: 40, description: 'Total Kapasitas Kursi Bus' })
  @IsNumber()
  @IsNotEmpty()
  seats: number;
}