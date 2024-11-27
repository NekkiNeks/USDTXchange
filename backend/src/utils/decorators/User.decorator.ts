import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import iJwtPayload from 'src/types/jwtPayload';

export type IUserInfo = iJwtPayload | null;

/**
 * Данный декоратор позволяет получить доступ к данным пользователя, который делает запрос
 */
export const UserInfo = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  // Получаем данные из свойства jwtdata, которое было добавлено в методе validate JWT стратегии.
  const data = request.user.jwtdata as iJwtPayload | null;

  // Проверка на неверное использование декоратора.
  if (!data) {
    const message = 'Использование декоратора @UserInfo() в публичном эндпоинте запрещено.';
    throw new InternalServerErrorException(message);
  }

  return data;
});
