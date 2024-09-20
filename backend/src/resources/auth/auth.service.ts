import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import iJwtPayload from 'src/types/jwtPayload';
import eUserType from 'src/types/userType';
import { JwtService } from '@nestjs/jwt';
import { iUser } from '../users/entities/user.entity';
import { iEmployee } from '../employees/entities/employee.entity';

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
    // TODO: Переделать строки на env
    return {
      accessToken: this.jwt.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwt.sign(payload, { expiresIn: '7d' }),
    };
  }

  validatePassword(user: iPerson, password: string) {
    // TODO: Переделать на bcrypt
    const passwordsAreEqual = password === user.password;
    if (!passwordsAreEqual) throw new UnauthorizedException('Введенный пароль не верный.');
    return passwordsAreEqual;
  }
}
