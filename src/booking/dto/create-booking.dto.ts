import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID dari bus yang akan dipesan',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  busId: number;

  @ApiProperty({
    description: 'Jumlah tiket yang ingin dibeli',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  jumlahTiket: number;
}