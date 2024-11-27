import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  @Roles('ADMIN', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Создание валюты',
    description: 'Возвращает созданную валюту',
  })
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  @Roles('ADMIN', 'SENIOR_MANAGER', 'MANAGER')
  @ApiOperation({
    summary: 'Получить все существующие валюты',
    description: 'Возвращает массив валют',
  })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER', 'MANAGER')
  @ApiOperation({
    summary: 'Получить валюту по ID',
    description: 'Возвращает сущность валюты',
  })
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOneById(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Обновление данных валюты',
    description: 'Возвращает сущность обновленной валюты',
  })
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Удаление валюты',
    description: 'Возвращает сущность удаленной валюты',
  })
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(id);
  }
}
