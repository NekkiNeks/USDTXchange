import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import ResponseInterceptor from './utils/interceptors/Response.interceptor';
import InternalErrorFilter from './utils/filters/InternalError.filter';
import ResponseFilter from './utils/filters/ResponseError.filter';
import PrismaFilter from './utils/filters/PrismaError.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import JwtAuthGuard from './utils/guards/Jwt.guard';
import { RolesGuard } from './utils/guards/Roles.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('USDTXchange')
  .setDescription('Документация сервиса USDTXchange')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.useGlobalFilters(new ResponseFilter(), new PrismaFilter(), new InternalErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Настройка документации OpenAPI
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
