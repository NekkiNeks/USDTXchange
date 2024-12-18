import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, PrismaService],
})
export class CurrenciesModule {}
