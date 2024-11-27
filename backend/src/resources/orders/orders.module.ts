import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { EmployeesService } from '../employees/employees.service';

@Module({
  imports: [UtilsModule],
  controllers: [OrdersController],
  providers: [OrdersService, EmployeesService],
})
export class OrdersModule {}
