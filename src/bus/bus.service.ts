import { Injectable, NotFoundException } from '@nestjs/common';

type Bus = {
  id: number;
  name: string;
  plateNumber: string;
  capacity: number;
};

@Injectable()
export class BusService {
  private buses: Bus[] = [];
  private id = 1;

  create(dto: any) {
    const bus: Bus = { id: this.id++, ...dto };
    this.buses.push(bus);
    return bus;
  }

  findAll() {
    return this.buses;
  }

  findOne(id: number) {
    const bus = this.buses.find(b => b.id === id);
    if (!bus) throw new NotFoundException('Bus not found');
    return bus;
  }

  update(id: number, dto: any) {
    const bus = this.findOne(id);
    Object.assign(bus, dto);
    return bus;
  }

  remove(id: number) {
    const index = this.buses.findIndex(b => b.id === id);
    return this.buses.splice(index, 1);
  }
}