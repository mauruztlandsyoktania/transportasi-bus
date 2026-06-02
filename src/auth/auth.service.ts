import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER USER BARU
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar!');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hash,
        role: 'USER', // Default role saat daftar adalah USER
      },
    });

    return {
      message: 'Register success',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  // LOGIN USER & KIRIM TOKEN + ROLE
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan!');
    }

    const valid = await bcrypt.compare(dto.password, user.password);

    if (!valid) {
      throw new UnauthorizedException('Password salah!');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role, // Memasukkan role ke dalam enkripsi token JWT
    });

    // Mengembalikan Token, Role, Nama, dan Email secara langsung
    return {
      access_token: token,
      role: user.role, // 👈 Frontend tinggal membaca properti ini ("ADMIN" / "USER")
      name: user.name,
      email: user.email,
    };
  }
}