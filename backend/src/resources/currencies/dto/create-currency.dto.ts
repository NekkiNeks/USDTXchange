import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iCreateCurrency } from '../entities/currency.entity';

interface iCreateCurrencyDto extends iCreateCurrency {}

export class CreateCurrencyDto implements iCreateCurrencyDto {
  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  name: string;

  @IsNumber({}, { message: typeMessage('exchangeRate', 'number') })
  @IsNotEmpty({ message: nonEmptyMessage('exchangeRate') })
  exchangeRate: number;
}
