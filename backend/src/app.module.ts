import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersService } from './resources/users/users.service';
import { EmployeesService } from './resources/employees/employees.service';
import { AuthService } from './resources/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import JwtStrategy from './utils/strategies/Jwt.strategy';
import { jwtModuleAsyncConfig } from './utils/config';
// Настройка JWT модуля используя .env и ConfigService

const jwtModuleAsync = JwtModule.registerAsync(jwtModuleAsyncConfig);

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UtilsModule, ResourcesModule, jwtModuleAsync],
  controllers: [AppController],
  providers: [AppService, UsersService, EmployeesService, AuthService, JwtStrategy],
})
export class AppModule {}
