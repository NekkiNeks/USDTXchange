import { IsNotEmpty, IsString } from 'class-validator';
import { iEmployee } from '../entities/employee.entity';

function nonEmptyMessage(key: string) {
  return `Поле ${key} является обязательным.`;
}

function typeMessage(key: string, type: string) {
  return `Поле ${key} должно иметь тип ${type}.`;
}

export class CreateEmployeeDto implements Partial<iEmployee> {
  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  name: string;

  @IsString({ message: typeMessage('email', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('email') })
  email: string;

  
}
