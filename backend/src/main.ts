import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ResponseInterceptor from './utils/interceptors/Response.interceptor';
import InternalErrorFilter from './utils/filters/InternalError.filter';
import ResponseFilter from './utils/filters/ResponseError.filter';
import PrismaFilter from './utils/filters/PrismaError.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();
  app.useGlobalFilters(new InternalErrorFilter(), new ResponseFilter(), new PrismaFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
