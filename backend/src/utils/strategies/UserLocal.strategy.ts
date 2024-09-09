import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/resources/auth/auth.service';

@Injectable()
export default class UserLocalStrategy extends PassportStrategy(Strategy, 'UserLocal') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    return this.authService.validateUser(username, password);
  }
}
