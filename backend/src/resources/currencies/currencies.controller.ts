import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  @Roles('ADMIN', 'SENIOR_MANAGER')
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  @Roles('ADMIN', 'SENIOR_MANAGER')
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOneById(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(id);
  }
}
