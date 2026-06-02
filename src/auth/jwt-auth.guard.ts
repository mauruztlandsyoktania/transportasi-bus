import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Cek apakah rute ini butuh role tertentu (misal @Roles('ADMIN'))
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    // 2. Ambil token dari Header Request
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token tidak ditemukan atau tidak valid. Silakan login kembali.');
    }

    const token = authHeader.split(' ')[1];

    try {
      // 3. Validasi Token JWT (Sekaligus mengekstrak isi payload-nya)
      const payload = this.jwtService.verify(token, { secret: 'secretKey' }); // Gunakan secretKey milikmu
      request.user = payload; // Simpan data user ke request

      // 4. Jika rute ini butuh role spesifik, kita cocokkan
      if (requiredRoles) {
        const hasRole = requiredRoles.includes(payload.role);
        if (!hasRole) {
          throw new ForbiddenException('Akses ditolak! Hanya ADMIN yang boleh mengakses rute ini.');
        }
      }

      return true; // Token valid dan Role cocok!
    } catch (err) {
      throw new UnauthorizedException('Sesi token Anda telah berakhir atau tidak valid');
    }
  }
}