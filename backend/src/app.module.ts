import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersService } from './resources/users/users.service';
import { EmployeesService } from './resources/employees/employees.service';
import { AuthService } from './resources/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from './utils/strategies/Jwt.strategy';

const jwtModule = JwtModule.register({
  // TODO: Перенести в env
  secret: 'foobar',
});

@Module({
  imports: [UtilsModule, ResourcesModule, jwtModule],
  controllers: [AppController],
  providers: [AppService, UsersService, EmployeesService, AuthService, JwtStrategy],
})
export class AppModule {}
