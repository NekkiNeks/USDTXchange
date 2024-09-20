import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  // TODO: Перенести в env
  secret: 'foobar',
});

@Module({
  imports: [UtilsModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmployeesService],
})
export class AuthModule {}
