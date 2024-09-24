import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import iJwtPayload from 'src/types/jwtPayload';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

/**
 * Данная функция позволяет получать токен из cookie с названием accessToken в запросе.
 * @param request Сущность запроса
 * @returns Токен или null
 */
const CookiesExtractor = (request: Request) => {
  const token = request.cookies.accessToken;
  if (!token) return null;
  return token;
};

/**
 * Данная стратегия позволяет валидировать токен при запросе, а так же помещать данные из токена в `request.user.jwtdata`.
 */
@Injectable()
export default class extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('secret: ', secret);

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([CookiesExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: iJwtPayload) {
    // Сохраняем расшифрованные данные в request.jwtdata
    return { jwtdata: payload };
  }
}
