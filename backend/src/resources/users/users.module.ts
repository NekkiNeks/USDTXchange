import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsModule } from 'src/utils/utils.module';
import JwtStrategy from 'src/utils/strategies/Jwt.strategy';

@Module({
  imports: [UtilsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
