import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { RoutesModule } from './resources/routes.module';

@Module({
  imports: [UtilsModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
