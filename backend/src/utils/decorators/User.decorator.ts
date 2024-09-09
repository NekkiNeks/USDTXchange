import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import iJwtPayload from 'src/types/jwtPayload';

export type IUserInfo = iJwtPayload | null;

export const UserInfo = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  // Получаем данные из свойства jwtdata, которое было добавлено в методе validate JWT стратегии.
  const data = request.jwtdata;

  // TODO: Удалить после тестов
  console.log(`Данные UserInfo: ${data}`);

  // Проверка на неверное использование декоратора.
  if (!data) throw new Error('Использование декоратора @UserInfo() в публичном эндпоинте запрещено.');

  return data;
});
