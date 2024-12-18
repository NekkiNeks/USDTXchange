import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import { SerializedUser } from '../users/entities/user.entity';
import { SerializedEmployee } from '../employees/entities/employee.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import PublicRoute from 'src/utils/decorators/PublicRoute.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private employeesService: EmployeesService,
  ) {}

  @Post('user')
  @PublicRoute()
  @ApiOperation({
    summary: 'Вход пользователя в систему',
    description: 'Возвращает данные пользователя, а так же добавляет токены в cookies',
  })
  async loginUser(@Body() body: LoginUserDto, @Req() request: Request) {
    const user = await this.usersService.findOneByUsername(body.username);

    const { accessToken, refreshToken } = await this.authService.getUserJwt(user);
    request.res.cookie('accessToken', accessToken);
    request.res.cookie('refreshToken', refreshToken);
    return SerializedUser.create(user);
  }

  @Post('employee')
  @PublicRoute()
  @ApiOperation({
    summary: 'Вход сотрудника в систему',
    description: 'Возвращает данные сотрудника, а так же добавляет токены в cookies',
  })
  async loginEmployee(@Body() body: LoginUserDto, @Req() request: Request) {
    const employee = await this.employeesService.findOneByUsername(body.username);
    const { accessToken, refreshToken } = await this.authService.getEmployeeJwt(employee);
    request.res.cookie('accessToken', accessToken);
    request.res.cookie('refreshToken', refreshToken);
    return SerializedEmployee.create(employee);
  }

  @Post('user/register')
  @PublicRoute()
  @ApiOperation({
    summary: 'Регистрация пользвателя',
    description: 'Возвращает данные пользователя, а так же добавляет токены в cookies',
  })
  async registerUser(@Body() body: RegisterUserDto, @Req() request: Request) {
    const user = await this.usersService.create(body);
    const { accessToken, refreshToken } = await this.authService.getUserJwt(user);
    request.res.cookie('accessToken', accessToken);
    request.res.cookie('refreshToken', refreshToken);
    return SerializedUser.create(user);
  }

  @Post('logout')
  @PublicRoute()
  @ApiOperation({
    summary: 'Выход из системы (как пользователя, так и сотрудника)',
    description: 'Возвращает информационное сообщение и удаляет токены из cookies',
  })
  logout(@Req() request: Request) {
    request.res.clearCookie('accessToken');
    request.res.clearCookie('refreshToken');
    return 'Куки успешно очищены';
  }
}
