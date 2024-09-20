import { Prisma } from '@prisma/client';

type currency = Prisma.currenciesGetPayload<{}>;

export interface iCurrency extends currency {}
