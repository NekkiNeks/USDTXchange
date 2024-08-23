import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import UserLocalStrategy from 'src/utils/strategies/UserLocal.strategy';
import EmployeeLocalStrategy from 'src/utils/strategies/EmpoyeeLocal.strategy';

@Module({
  imports: [UtilsModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmployeesService, UserLocalStrategy, EmployeeLocalStrategy],
})
export class AuthModule {}
