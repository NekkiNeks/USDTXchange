import { Prisma } from '@prisma/client';

type currency = Prisma.CurrencyGetPayload<{}>;

type createCurrencyData = Prisma.CurrencyCreateManyInput;

export interface iCurrency extends currency {}

export interface iCreateCurrency extends createCurrencyData {}
