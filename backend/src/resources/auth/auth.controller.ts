import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserLocalAuthGuard from 'src/utils/guards/UserLocal.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(UserLocalAuthGuard)
  @Post('user')
  loginUser() {
    return 'Пользователь успешно авторизирован';
  }

  @UseGuards(UserLocalAuthGuard)
  @Post('employee')
  loginEmployee() {
    return 'Сотрудник успешно авторизирован';
  }

  @Post('logout')
  logout() {}
}
