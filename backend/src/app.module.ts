import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersService } from './resources/users/users.service';
import { EmployeesService } from './resources/employees/employees.service';
import { AuthService } from './resources/auth/auth.service';

@Module({
  imports: [UtilsModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService, UsersService, EmployeesService, AuthService],
})
export class AppModule {}
