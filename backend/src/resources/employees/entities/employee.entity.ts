import { Prisma, employees } from '@prisma/client';

type employee = Prisma.employeesGetPayload<{}>;

type employeeWithRequest = Prisma.employeesGetPayload<{
  include: {
    requests: true;
  };
}>;

export interface iEmployee extends employee {}
export interface iEmployeeWithRequest extends employeeWithRequest {}
