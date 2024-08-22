import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [EmployeesModule, UtilsModule],
})
export class RoutesModule {}
