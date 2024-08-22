import { Observable, map } from 'rxjs';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

export default class implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
        };
      }),
    );
  }
}
