import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards, // 👈 Ditambahkan untuk mengaktifkan fitur guard
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 Ditambahkan untuk meng-import guard dari folder auth

@ApiTags('Bus')
@ApiBearerAuth('access-token')
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // 👈 Kunci endpoint ini: token wajib diisi
  create(@Body() dto: CreateBusDto) {
    return this.busService.create(dto);
  }

  @Get() // Bebas akses (tidak pakai guard) agar user umum bisa melihat daftar bus
  findAll() {
    return this.busService.findAll();
  }

  @Get(':id') // Bebas akses
  findOne(@Param('id') id: string) {
    return this.busService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // 👈 Kunci endpoint ini
  update(@Param('id') id: string, @Body() dto: UpdateBusDto) {
    return this.busService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // 👈 Kunci endpoint ini
  async remove(@Param('id') id: string) {
    await this.busService.remove(+id);
    
    return {
      statusCode: 200,
      message: `Bus dengan ID ${id} telah berhasil dihapus`,
    };
  }
}