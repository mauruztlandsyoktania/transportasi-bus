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
      // 3. Validasi Token JWT dengan secret_key yang sesuai dengan JwtStrategy kamu
      const payload = this.jwtService.verify(token, { secret: 'secret_key' }); // 👈 DISAMAKAN MENJADI 'secret_key'
      request.user = payload; // Menyimpan data user (id, email, role) ke request.user

      // 4. Jika rute ini dikunci untuk role tertentu (seperti CRUD Bus yang dipasang @Roles('ADMIN'))
      if (requiredRoles) {
        const hasRole = requiredRoles.includes(payload.role);
        
        // Jika token valid tapi role-nya adalah USER (bukan ADMIN), langsung lempar 403 Forbidden!
        if (!hasRole) {
          throw new ForbiddenException('Akses Ditolak! Role USER tidak diizinkan untuk melakukan CRUD Bus.');
        }
      }

      return true; // Token valid dan role sesuai (ADMIN), akses diberikan!
    } catch (err) {
      // Menangani jika ada error custom dari ForbiddenException di atas agar tidak tertimpa
      if (err instanceof ForbiddenException) {
        throw err;
      }
      throw new UnauthorizedException('Sesi login Anda telah berakhir atau token tidak valid');
    }
  }
}