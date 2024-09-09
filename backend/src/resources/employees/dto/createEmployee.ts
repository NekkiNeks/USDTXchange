import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { iEmployee } from '../entities/employee.entity';
import { $Enums, role } from '@prisma/client';
import { enumMessage, typeMessage, nonEmptyMessage } from 'src/utils/heplers/validationErrorMessageGenerators';

export class CreateEmployeeDto implements Partial<iEmployee> {
  @IsString({ message: typeMessage('username', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('username') })
  username: string;

  @IsString({ message: typeMessage('password', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('password') })
  password: string;

  @IsString({ message: typeMessage('role', 'string') })
  @IsEnum($Enums.role, { message: enumMessage('role', role) })
  role: $Enums.role;

  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  name: string;

  @IsString({ message: typeMessage('surname', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('surname') })
  surname: string;

  @IsString({ message: typeMessage('telegram', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('telegram') })
  telegram: string;

  @IsString({ message: typeMessage('email', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('email') })
  email: string;

  @IsString({ message: typeMessage('phone', 'string') })
  @IsOptional()
  phone?: string;
}
