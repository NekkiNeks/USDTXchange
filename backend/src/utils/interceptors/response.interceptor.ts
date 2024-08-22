import { Observable, map } from 'rxjs';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import unfiedResponse from 'src/types/unifiedResponse';
import { Response } from 'express';

export default class implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = response.statusCode;

        const res: unfiedResponse = {
          success: true,
          data,
          message: null,
          status,
        };

        return res;
      }),
    );
  }
}
