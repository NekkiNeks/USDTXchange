import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import responseInterceptor from './utils/interceptors/response.interceptor';
import InternalErrorFilter from './utils/filters/internalError.filter';
import ResponseFilter from './utils/filters/responseError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new responseInterceptor());
  app.useGlobalFilters(new InternalErrorFilter(), new ResponseFilter());
  await app.listen(3000);
}
bootstrap();
