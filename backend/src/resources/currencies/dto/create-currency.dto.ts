import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iCreateCurrency } from '../entities/currency.entity';
import { ApiProperty } from '@nestjs/swagger';

interface iCreateCurrencyDto extends iCreateCurrency {}

export class CreateCurrencyDto implements iCreateCurrencyDto {
  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  @ApiProperty({
    description: 'Название валюты',
    example: 'Тенге',
  })
  name: string;

  @IsNumber({}, { message: typeMessage('exchangeRate', 'number') })
  @IsNotEmpty({ message: nonEmptyMessage('exchangeRate') })
  @ApiProperty({
    description: 'Курс валюты к USDT',
    example: 0.25,
  })
  exchangeRate: number;
}
