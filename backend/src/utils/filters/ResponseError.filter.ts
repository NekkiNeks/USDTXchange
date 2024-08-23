import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { Response, Request } from 'express';
import unifiedResponse from 'src/types/unifiedResponse';

// Данный фильтр оборачивает ответ от сервера в унифицированный вид
@Catch(HttpException)
export default class ResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // @ts-ignore
    const message = exception.response.message;

    const res: unifiedResponse = {
      success: false,
      data: null,
      status,
      message: message || exception.message,
    };

    response.status(status).send(res);
  }
}
