import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Метод для создания новой валюты в БД.
   * @param createCurrencyDto DTO для создания новой валюты
   * @returns Возвращает созданную валюту
   */
  async create(createCurrencyDto: CreateCurrencyDto) {
    const data = {
      name: createCurrencyDto.name,
      exchange_rate: createCurrencyDto.exchangeRate,
    };

    return this.prisma.client.currencies.create({ data });
  }

  /**
   * Метод для получения всех валют в БД.
   * @returns Возвращает массив валют.
   */
  async findAll() {
    return this.prisma.client.currencies.findMany();
  }

  /**
   * Метод для получения валюты по ID.
   * @param id ID валюты.
   * @returns Возвращает найденую валюту или NotFountException если валюта не была найдена.
   */
  async findOneById(id: string) {
    const result = await this.prisma.client.currencies.findFirst({ where: { id } });
    if (!result) throw new NotFoundException('Ошибка при получении валюты: Валюта с таким ID не была найдена.');

    return result;
  }

  /**
   * Метод для изменения валюты по ID.
   * @param id ID валюты.
   * @param updateCurrencyDto DTO для обновления валюты.
   * @returns Возвращает обновленную валюту или NotFoundException если валюта не была найдена.
   */
  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    const data = {
      name: updateCurrencyDto.name,
      exchange_rate: updateCurrencyDto.exchangeRate,
    };
    const result = await this.prisma.client.currencies.update({ where: { id }, data });
    if (!result) throw new NotFoundException('Ошибка при обновлении валюты: Валюта с таким ID не была найдена.');

    return result;
  }

  /**
   * Метод для удаления валюты по ID.
   * @param id ID валюты.
   * @returns Возвращает удаленную валюту или NotFoundException если валюта не была найдена.
   */
  async remove(id: string) {
    const result = await this.prisma.client.currencies.delete({ where: { id } });
    if (!result) throw new NotFoundException('Ошибка при удалении валюты: Валюта с таким ID не была найдена.');

    return result;
  }
}