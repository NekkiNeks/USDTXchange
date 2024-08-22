import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// Сервисы, которые экспортируются в другие модули
const services = [PrismaService];

@Module({
  providers: services,
  exports: services,
})
export class UtilsModule {}
