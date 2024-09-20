import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './createEmployee';
import { typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { IsString } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsString({ message: typeMessage('username', 'string') })
  username?: string;

  @IsString({ message: typeMessage('password', 'string') })
  password?: string;

  @IsString({ message: typeMessage('name', 'string') })
  name?: string;

  @IsString({ message: typeMessage('surname', 'string') })
  surname?: string;

  @IsString({ message: typeMessage('telegram', 'string') })
  telegram?: string;

  @IsString({ message: typeMessage('email', 'string') })
  email?: string;

  @IsString({ message: typeMessage('phone', 'string') })
  phone?: string;
}
