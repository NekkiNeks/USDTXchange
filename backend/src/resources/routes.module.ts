import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EmployeesModule, UtilsModule, AuthModule, UsersModule],
})
export class RoutesModule {}
