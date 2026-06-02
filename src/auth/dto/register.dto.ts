import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Nia Oktania' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'nia@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  // Kolom role ini dibuat OPTIONAL (tidak wajib diisi). 
  // Jika tidak diisi di Swagger, dia otomatis bernilai undefined dan didaftarkan sebagai USER.
  @ApiProperty({ 
    example: 'USER', 
    required: false, 
    description: 'Isi dengan ADMIN jika ingin mendaftar sebagai admin. Kosongkan jika ingin menjadi USER biasa.' 
  })
  @IsString()
  @IsOptional()
  role?: string;
}