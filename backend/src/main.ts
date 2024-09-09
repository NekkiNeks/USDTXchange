import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import ResponseInterceptor from './utils/interceptors/Response.interceptor';
import InternalErrorFilter from './utils/filters/InternalError.filter';
import ResponseFilter from './utils/filters/ResponseError.filter';
import PrismaFilter from './utils/filters/PrismaError.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import JwtAuthGuard from './utils/guards/Jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalFilters(new PrismaFilter(), new ResponseFilter(), new InternalErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
