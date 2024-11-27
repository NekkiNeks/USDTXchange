import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { typeMessage, nonEmptyMessage, enumMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iCreateOrder } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface iCreateOrderDto extends Omit<iCreateOrder, 'userId' | 'managerId'> {
  userId?: string;
  managerId?: string;
}

export class CreateOrderDto implements iCreateOrderDto {
  @IsNumber({}, { message: typeMessage('amount', 'number') })
  @IsNotEmpty({ message: nonEmptyMessage('amount') })
  @ApiProperty({
    description: 'Колличество запрашиваемых средств',
    example: 150,
  })
  amount: number;

  @IsString({ message: typeMessage('managerId', 'string') })
  @IsOptional()
  @ApiProperty({
    description: 'ID менеджера, на которого будет назначена заявка',
    example: 'ca8157af-e081-489f-924d-7e2988bce069',
  })
  managerId?: string;

  @IsString({ message: typeMessage('currencyId', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('currencyId') })
  @ApiProperty({
    description: 'ID валюты, которая предоставляется к обмену',
    example: 'ca8157af-e081-489f-924d-7e2988bce069',
  })
  currencyId: string;

  @IsEnum($Enums.network, { message: enumMessage('network', $Enums.network) })
  @IsNotEmpty({ message: nonEmptyMessage('network') })
  @ApiProperty({
    description: 'Сеть кошелька, на который будет выполнен перевод',
    example: 'TRC20',
  })
  network: $Enums.network;

  @IsString({ message: typeMessage('userId', 'string') })
  @IsOptional()
  @ApiProperty({
    description: 'ID пользователя, на которого будет назначена заявка (При создании заявки сотрудником)',
    example: 'ca8157af-e081-489f-924d-7e2988bce069',
  })
  userId?: string;
}
