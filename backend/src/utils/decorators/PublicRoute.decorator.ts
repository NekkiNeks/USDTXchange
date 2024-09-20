import { SetMetadata } from '@nestjs/common';

/**
 * Декоратор позволяет отключить проверку глобальный `guard` для проверки JWT токена в cookies и делает ресурс публичным. Можно применять как к контроллерам целиком, так и к определенным методам контроллеров.
 */
export default function PublicRoute() {
  return SetMetadata('isPublic', true);
}
