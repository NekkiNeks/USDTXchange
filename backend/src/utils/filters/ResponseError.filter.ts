import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

import { Response } from 'express';
import unifiedResponse from 'src/types/unifiedResponse';

function getErrorMessage(exception: any) {
  try {
    if (Array.isArray(exception.response.message)) {
      return exception?.response?.message?.join(' \n');
    }

    if (exception.response && exception.response.message) {
      return exception?.response?.message;
    }

    return exception.message;
  } catch (error: any) {
    return 'Неизвестная ошибка';
  }
}

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

    if (status < 400) {
      console.error('Внутренняя ошибка сервера. Неверный статус при отлавливании ошибки в ResponseError.filter.ts');
      status = 500;
    }

    const res: unifiedResponse = {
      success: false,
      data: null,
      status,
      message: getErrorMessage(exception),
    };

    response.status(status).send(res);

    return;
  }
}
