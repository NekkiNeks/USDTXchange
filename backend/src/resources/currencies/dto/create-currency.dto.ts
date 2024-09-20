import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';

export class CreateCurrencyDto {
  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  name: string;

  @IsNumber({}, { message: typeMessage('exchangeRate', 'number') })
  @IsNotEmpty({ message: nonEmptyMessage('exchangeRate') })
  exchangeRate: number;
}
