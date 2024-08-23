import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';

interface iPerson {
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private employeesService: EmployeesService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    return this.validatePassword(user, password);
  }

  async validateEmployee(username: string, password: string) {
    const employee = await this.employeesService.findOneByUsername(username);
    return this.validatePassword(employee, password);
  }

  validatePassword(user: iPerson, password: string) {
    // TODO: Переделать на bcrypt
    const passwordsAreEqual = password === user.password;
    if (!passwordsAreEqual) throw new UnauthorizedException('Введенный пароль не верный.');
    return passwordsAreEqual;
  }
}
