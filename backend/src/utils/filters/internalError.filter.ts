import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import unfiedResponse from 'src/types/unifiedResponse';

// Данный фильтр отслеживает внутренние ошибки сервера и уведомляет об этом Администратора сервиса
@Catch(Error)
export default class InternalErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const next = ctx.getNext<NextFunction>();
    if (exception instanceof HttpException) next();
    if (response.statusCode !== 500) next();
    const requestMessagePart = `Запрос: \n  url: ${request.url} \n  ip: ${request.ip} \n  body: ${JSON.stringify(request.body, null, 2)}, \n  headers: ${JSON.stringify(request.headers, null, 2)}`;
    const errorMessage = `Внутренняя ошибка сервера! \n Ошибка: \n  ${exception.message}\n ${requestMessagePart}, \nАдминистратор будет уведомлен.`;
    console.error(errorMessage);

    // TODO: Добавить уведомление администратора по почте указанной в process.env.ADMIN_EMAIL

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const res: unfiedResponse = {
      success: false,
      data: null,
      message: 'Внутренняя ошибка сервера. Администратор будет уведомлен.',
      status,
    };

    response.status(status).send(res);
  }
}
