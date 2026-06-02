import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Bus')
@ApiBearerAuth('access-token')
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  create(@Body() dto: CreateBusDto) {
    return this.busService.create(dto);
  }

  @Get()
  findAll() {
    return this.busService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBusDto) {
    return this.busService.update(+id, dto);
  }

  // 🔥 PERUBAHAN DI SINI: Menggunakan async/await untuk mengirim pesan custom
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.busService.remove(+id);
    
    return {
      statusCode: 200,
      message: `Bus dengan ID ${id} telah berhasil dihapus`,
    };
  }
}