import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({}); // 👈 INI WAJIB DI PRISMA 7
  }

  async onModuleInit() {
    await this.$connect();
  }
}