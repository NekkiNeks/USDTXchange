import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';
import unifiedResponse from 'src/types/unifiedResponse';

/**
 * Данный фильтр отслеживает внутренние ошибки сервера и уведомляет об этом Администратора сервиса
 */
@Catch(InternalServerErrorException)
export default class InternalErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestBodyString = JSON.stringify(request.body, null, 2);
    const requestHeadersString = JSON.stringify(request.headers, null, 2);

    // Полезная информация о запросе при уведомлении администратора.
    const requestMessagePart = `Запрос: \n  url: ${request.url} \n  ip: ${request.ip} \n  body: ${requestBodyString}, \n  headers: ${requestHeadersString}`;

    const errorMessage = `Внутренняя ошибка сервера! \nОшибка: \n${exception.message} \nАдминистратор будет уведомлен.`;

    console.error(`Внутренняя ошибка: ${exception.message}`);

    // TODO: Добавить уведомление администратора по почте указанной в process.env.ADMIN_EMAIL

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const res: unifiedResponse = {
      success: false,
      data: null,
      message: errorMessage,
      status,
    };

    response.status(status).send(res);
    return;
  }
}
