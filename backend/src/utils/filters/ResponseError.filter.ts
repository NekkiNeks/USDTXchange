import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { Response, Request } from 'express';
import unifiedResponse from 'src/types/unifiedResponse';

// Данный фильтр оборачивает ответ от сервера в унифицированный вид
@Catch()
export default class ResponseFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message;

    const res: unifiedResponse = {
      success: false,
      data: null,
      status: response.statusCode,
      message: message || exception.message,
    };

    response.send(res);
    return;
  }
}
