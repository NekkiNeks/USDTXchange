import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Данный Guard позволяет использовать декоратор `@Guards`.
 */

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Если роли не заданы, доступ разрешен
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      const message = 'Использование декоратора @Roles в публичном эндпоите запрещено.';
      throw new InternalServerErrorException(message);
    }

    const userRole = request.user.jwtdata.role;

    console.log(userRole);

    if (!userRole || !roles.includes(userRole)) {
      throw new UnauthorizedException('Недостаточно прав для использования данного эндпоинта.');
    }

    return true;
  }
}
