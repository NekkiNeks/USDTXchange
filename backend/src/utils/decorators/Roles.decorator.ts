import { SetMetadata } from '@nestjs/common';
import { role } from '@prisma/client';
/**
 * Данный декоратор ограничивает доступ к эндпоинту по ролям.
 * @param roles Роли, которые могут получать доступ к эндпоинту
 */
export const Roles = (...roles: role[]) => SetMetadata('roles', roles);
