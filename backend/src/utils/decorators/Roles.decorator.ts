import { SetMetadata } from '@nestjs/common';

/**
 * Данный декоратор ограничивает доступ к эндпоинту по ролям.
 * @param roles Роли, которые могут получать доступ к эндпоинту
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
