import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncConfig } from '../../utils/config';

// Настройка JWT модуля используя .env и ConfigService
const jwtModuleAsync = JwtModule.registerAsync(jwtModuleAsyncConfig);

@Module({
  imports: [UtilsModule, jwtModuleAsync],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmployeesService],
})
export class AuthModule {}
