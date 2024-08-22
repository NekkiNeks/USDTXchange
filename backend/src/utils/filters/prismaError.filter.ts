import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const externalErrorCodeRegex = /^P0d{2}$/;

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const next = ctx.getNext();

    console.log('Код ошибки Prisma: ', exception.code);

    // P2002 - Ошибка уникальности
    if (exception.code === 'P2002') {
      const message = `Ошибка БД. Следующие поля являются уникальными: ${exception.meta.target}.`;
      next(new BadRequestException(message));
      return;
    }

    if (externalErrorCodeRegex.test(exception.code)) {
      const message = 'Ошибка Базы данных при запросе. Проверьте передаваемые данные и попробуйте еще раз.';
      next(new BadRequestException(message));
      return;
    }

    const message = 'Внутренняя ошибка Базы данных. Администратор будет уведомлен о неполадках.';
    next(new InternalServerErrorException(message));
  }
}

// Вот некоторые ошибки со стороны пользователя и их коды.
// P2000: Значение для поля слишком длинное для базы данных. Это происходит, когда вы пытаетесь вставить или обновить запись с данными, которые превышают допустимую длину, указанную в схеме базы данных.

// P2001: Запись не найдена для данного запроса. Эта ошибка возникает, когда вы пытаетесь найти или обновить запись, которая не существует в базе данных.

// P2002: Нарушение уникального ограничения. Эта ошибка возникает, когда вы пытаетесь создать или обновить запись с таким значением, которое должно быть уникальным, но уже существует в базе данных.

// P2003: Нарушение внешнего ключа. Эта ошибка возникает, когда операция нарушает ограничение внешнего ключа, например, при попытке вставить запись с внешним ключом, который не существует в связанной таблице.

// P2004: Нарушение ограничения в базе данных. Это общая ошибка, связанная с нарушением различных типов ограничений в базе данных, таких как ограничение "не null" или проверки.

// P2005: Неправильное значение для поля. Эта ошибка возникает, когда вы пытаетесь вставить или обновить запись с данными, которые не соответствуют ожидаемому типу или формату в схеме базы данных.
