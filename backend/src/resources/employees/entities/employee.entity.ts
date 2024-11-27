import { $Enums, Prisma } from '@prisma/client';
import { Exclude, plainToInstance } from 'class-transformer';

type employee = Prisma.EmployeeGetPayload<{}>;

type employeeWithOrders = Prisma.EmployeeGetPayload<{
  include: {
    orders: true;
  };
}>;

type createEmployeeData = Prisma.EmployeeCreateManyInput;

export interface iEmployee extends employee {}
export interface iEmployeeWithOrders extends employeeWithOrders {}
export interface iCreateEmployee extends createEmployeeData {}

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
