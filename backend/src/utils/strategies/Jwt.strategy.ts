import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import iJwtPayload from 'src/types/jwtPayload';

// TODO: Вынести в .env
const JWT_SECRET = 'foobar';

const CookiesExtractor = (request: Request) => {
  const token = request.cookies.accessToken;
  if (!token) return null;
  return token;
};

export default class extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([CookiesExtractor]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: iJwtPayload) {
    console.log('jwt strategy payload: ', payload);
    return true;
  }
}
