import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { typeMessage, nonEmptyMessage, enumMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iCreateOrder } from '../entities/order.entity';

export interface iCreateOrderDto extends Omit<iCreateOrder, 'userId' | 'managerId'> {
  userId?: string;
  managerId?: string;
}

export class CreateOrderDto implements iCreateOrderDto {
  @IsNumber({}, { message: typeMessage('amount', 'number') })
  @IsNotEmpty({ message: nonEmptyMessage('amount') })
  amount: number;

  @IsString({ message: typeMessage('managerId', 'string') })
  @IsOptional()
  managerId?: string;

  @IsString({ message: typeMessage('currencyId', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('currencyId') })
  currencyId: string;

  @IsEnum($Enums.network, { message: enumMessage('network', $Enums.network) })
  @IsNotEmpty({ message: nonEmptyMessage('network') })
  network: $Enums.network;

  @IsString({ message: typeMessage('userId', 'string') })
  @IsOptional()
  userId?: string;
}
