import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { iCreateEmployee, iEmployee } from '../entities/employee.entity';
import { $Enums, role } from '@prisma/client';
import { enumMessage, typeMessage, nonEmptyMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { ApiProperty } from '@nestjs/swagger';

export interface iCreateEmployeeDto extends iCreateEmployee {}

export class CreateEmployeeDto implements iCreateEmployeeDto {
  @IsString({ message: typeMessage('username', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('username') })
  @ApiProperty({
    description: 'Логин сотрудника',
    example: 'testempoyee',
  })
  username: string;

  @IsString({ message: typeMessage('password', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('password') })
  @ApiProperty({
    description: 'Пароль сотрудника',
    example: 'testpass',
  })
  password: string;

  @IsString({ message: typeMessage('role', 'string') })
  @IsEnum($Enums.role, { message: enumMessage('role', role) })
  @ApiProperty({
    description: 'Роль сотрудника',
    example: 'MANAGER',
  })
  role: $Enums.role;

  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  @ApiProperty({
    description: 'Имя сотрудника',
    example: 'Петя',
  })
  name: string;

  @IsString({ message: typeMessage('surname', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('surname') })
  @ApiProperty({
    description: 'Фамилия сотрудника',
    example: 'Курочкин',
  })
  surname: string;

  @IsString({ message: typeMessage('telegram', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('telegram') })
  @ApiProperty({
    description: 'Телеграм аккаунт сотрудника',
    example: 'usdtxEmployee',
  })
  telegram: string;

  @IsString({ message: typeMessage('email', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('email') })
  @ApiProperty({
    description: 'Электронная почта сотрудника',
    example: 'usdtxBestEmployee@yandex.ru',
  })
  email: string;

  @IsString({ message: typeMessage('phone', 'string') })
  @IsOptional()
  @ApiProperty({
    description: 'Телефон сотрудника',
    example: '79995553535',
  })
  phone?: string;
}
