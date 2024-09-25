import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import iJwtPayload from 'src/types/jwtPayload';
import eUserType from 'src/types/userType';
import { JwtService } from '@nestjs/jwt';
import { iUser } from '../users/entities/user.entity';
import { iEmployee } from '../employees/entities/employee.entity';
import { ConfigService } from '@nestjs/config';

const DEFAULT_ACCESS_EXPIRES = '1h';
const DEFAULT_REFRESH_EXPIRES = '7d';

interface iPerson {
  password: string;
}

interface iJwtTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private employeesService: EmployeesService,
    private jwt: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    return this.validatePassword(user, password);
  }

  async validateEmployee(username: string, password: string) {
    const employee = await this.employeesService.findOneByUsername(username);
    return this.validatePassword(employee, password);
  }

  async getEmployeeJwt(employee: iEmployee) {
    const payload = {
      userId: employee.id,
      username: employee.username,
      role: employee.role,
      type: eUserType.EMPLOYEE,
    };

    return this.getJwtTokens(payload);
  }

  async getUserJwt(user: iUser) {
    const payload = {
      userId: user.id,
      username: user.username,
      role: null,
      type: eUserType.USER,
    };

    return this.getJwtTokens(payload);
  }

  private getJwtTokens(payload: iJwtPayload): iJwtTokens {
    const accessTokenExpires = this.configService.get<string>('ACCESS_TOKEN_EXPIRES') || DEFAULT_ACCESS_EXPIRES;
    const refreshTokenExpires = this.configService.get<string>('REFRESH_TOKEN_EXPIRES') || DEFAULT_REFRESH_EXPIRES;

    return {
      accessToken: this.jwt.sign(payload, { expiresIn: accessTokenExpires }),
      refreshToken: this.jwt.sign(payload, { expiresIn: refreshTokenExpires }),
    };
  }

  validatePassword(user: iPerson, password: string) {
    // TODO: Переделать на bcrypt
    const passwordsAreEqual = password === user.password;
    if (!passwordsAreEqual) throw new UnauthorizedException('Введенный пароль не верный.');
    return passwordsAreEqual;
  }
}
