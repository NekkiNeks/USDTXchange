import { Prisma } from '@prisma/client';

type order = Prisma.OrderGetPayload<{}>;

type createOrderdata = Prisma.OrderCreateManyInput;

export interface iOrder extends order {}

export interface iCreateOrder extends createOrderdata {}
