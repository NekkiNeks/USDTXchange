import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { Response } from 'express';
import unifiedResponse from 'src/types/unifiedResponse';

/**
 * Данный фильтр оборачивает ответ от сервера в унифицированный вид
 */
@Catch()
export default class ResponseFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = response.statusCode;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    // TODO: Выяснить почему так происходит
    if (status < 400) {
      console.error('Неверный статус при ошибке в ResponseError.filter.ts');
      status = 500;
    }

    const message = exception.message;

    const res: unifiedResponse = {
      success: false,
      data: null,
      status,
      message: message || exception.message,
    };

    response.status(status).send(res);

    return;
  }
}
