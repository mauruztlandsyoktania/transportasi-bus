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
      throw new UnauthorizedException('Token tidak ditemukan. Silakan login terlebih dahulu.');
    }

    const token = authHeader.split(' ')[1];

    try {
      // 3. Validasi Token JWT dengan secret_key
      const payload = this.jwtService.verify(token, { secret: 'secret_key' });
      request.user = payload; // Menyimpan data user (id, email, role) ke request.user

      // 4. Jika rute ini dikunci untuk role tertentu
      if (requiredRoles) {
        const hasRole = requiredRoles.includes(payload.role);
        
        if (!hasRole) {
          // Menggunakan template string agar pesannya dinamis sesuai role yang diminta
          throw new ForbiddenException(`Akses Ditolak! Hanya role [${requiredRoles.join(', ')}] yang diizinkan untuk mengakses resource ini.`);
        }
      }

      return true; 
    } catch (err) {
      // 🟢 JIKA ERROR BERASAL DARI FORBIDDEN EXCEPTION (ROLE USER TIDAK DIKASIH IZIN)
      if (err instanceof ForbiddenException) {
        throw err;
      }

      // 🟢 JIKA TOKEN EXPIRED (KEDALUWARSA)
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Sesi login Anda telah berakhir! Silakan login ulang untuk mendapatkan token baru.');
      }

      // 🟢 JIKA TOKEN NGASAL / DIUBAH-UBAH / FORMAT SALAH
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token tidak valid! Karakter token telah dimanipulasi atau salah format.');
      }

      // Alternatif error JWT lainnya
      throw new UnauthorizedException('Verifikasi otentikasi gagal atau token tidak dikenali.');
    }
  }
}