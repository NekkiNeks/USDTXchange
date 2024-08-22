import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import responseInterceptor from './utils/interceptors/response.interceptor';
import InternalErrorFilter from './utils/filters/internalError.filter';
import ResponseFilter from './utils/filters/responseError.filter';
import { ValidationPipe } from '@nestjs/common';
import { PrismaFilter } from './utils/filters/prismaError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new InternalErrorFilter(), new ResponseFilter(), new PrismaFilter());
  app.useGlobalInterceptors(new responseInterceptor());
  await app.listen(3000);
}
bootstrap();
