import { $Enums, Prisma } from '@prisma/client';
import { Exclude, plainToInstance } from 'class-transformer';

type employee = Prisma.employeesGetPayload<{}>;


type employeeWithRequest = Prisma.employeesGetPayload<{
  include: {
    requests: true;
  };
}>;

export interface iEmployee extends employee {}
export interface iEmployeeWithRequest extends employeeWithRequest {}

export class SerializedEmployee implements iEmployee {
  /**
   * @deprecated Нужно использовать метод .create() вместо new
   */
  constructor() {}

  static create(employee: iEmployee) {
    return plainToInstance(SerializedEmployee, employee);
  }

  id: string;
  role: $Enums.role;
  username: string;

  @Exclude()
  password: string;

  name: string;
  surname: string;
  email: string;
  phone: string;
  telegram: string;
  createdAt: Date;
  updatedAt: Date;
}
