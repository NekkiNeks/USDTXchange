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

    // Ошибки начинающиеся с двойки - ошибки клиента которые возникают из-за неправильно переданных данных.
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

// P2006: Значение для поля выходит за допустимый диапазон. Эта ошибка связана с тем, что данные выходят за пределы допустимого диапазона для данного типа поля, например, когда вы пытаетесь сохранить значение, превышающее максимальное значение для целого числа.

// P2007: Ошибка проверки данных. Эта ошибка возникает, когда данные не соответствуют ожидаемому формату или ограничениям в схеме базы данных.

// P2008: Ошибка разбора запроса. Запрос неправильно сформирован или содержит ошибки, что приводит к сбою при его выполнении в базе данных.

// P2009: Ошибка проверки запроса. Эта ошибка связана с синтаксисом или логической структурой запроса, из-за чего он становится недействительным.

// P2010: Ошибка выполнения "сырого" запроса. Эта ошибка возникает, когда выполненный через Prisma SQL-запрос завершается с ошибкой, обычно из-за синтаксических ошибок или других проблем в SQL-запросе.

// P2011: Нарушение ограничения "не null". Эта ошибка возникает, когда вы пытаетесь вставить или обновить поле, которое не может быть null, с null-значением.

// P2012: Отсутствует необходимое значение. Эта ошибка возникает, когда в процессе создания или обновления записи не указано обязательное поле.

// P2013: Отсутствует обязательный аргумент. Эта ошибка возникает, когда функция или метод вызывается без необходимого аргумента.
