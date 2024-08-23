import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/resources/auth/auth.service';

@Injectable()
export default class EmployeeLocalStrategy extends PassportStrategy(Strategy, 'EmployeeLocal') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return this.authService.validateEmployee(username, password);
  }
}
