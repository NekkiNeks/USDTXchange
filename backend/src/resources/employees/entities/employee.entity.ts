import { $Enums, Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

type employee = Prisma.employeesGetPayload<{}>;

type employeeWithRequest = Prisma.employeesGetPayload<{
  include: {
    requests: true;
  };
}>;

export interface iEmployee extends employee {}
export interface iEmployeeWithRequest extends employeeWithRequest {}

// export class SerializedEmployee implements iEmployee {
//   id: string;
//   role: $Enums.role;
//   username: string;

//   @Exclude()
//   password: string;

//   name: string;
//   surname: string;
//   email: string;
//   phone: string;
//   telegram: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export class SerializedEmployee implements iEmployee {
  constructor(partial: Partial<SerializedEmployee>) {
    Object.assign(this, partial);
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
