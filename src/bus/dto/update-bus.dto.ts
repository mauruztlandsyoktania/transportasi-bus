import { ApiProperty } from '@nestjs/swagger';

export class UpdateBusDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  plateNumber?: string;

  @ApiProperty({ required: false })
  capacity?: number;
}