import { Prisma } from '@prisma/client';
import { Exclude, plainToInstance } from 'class-transformer';

type user = Prisma.usersGetPayload<{}>;

type userWithOrders = Prisma.usersGetPayload<{
  include: {
    orders: true;
  };
}>;

export interface iUser extends user {}
export interface iUserWithOrders extends userWithOrders {}

export class SerializedUser implements iUser {
  /**
   * @deprecated Нужно использовать метод .create() вместо new
   */
  constructor() {}

  static create(user: iUser) {
    return plainToInstance(SerializedUser, user);
  }

  id: string;
  username: string;

  @Exclude()
  password: string;

  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  telegram: string;
  updatedAt: Date;
}
