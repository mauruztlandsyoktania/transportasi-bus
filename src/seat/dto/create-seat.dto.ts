import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({
    description: 'Nomor atau kode kursi bus',
    type: String,
    example: 'A1', // 👈 Ini yang akan langsung tertulis di Swagger
  })
  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @ApiProperty({
    description: 'ID Bus tempat kursi ini berada',
    type: Number,
    example: 1, // 👈 Ini yang akan langsung tertulis di Swagger
  })
  @IsInt()
  @IsNotEmpty()
  busId: number;
}