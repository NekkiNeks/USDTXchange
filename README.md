# USDTXchage

Данный проект является ответвлением от проекта по обмену USDT на фиатные валюты.
В основе данного проекта лежит идея того, что приложение должно функционировать независимо от бирж. Данный проект должен решить проблему с кошельками, менеджерами, дельтами и подобным. 

Основным отличием от нынешнего проекта **Goldex** с которого началась разработка данного приложения является обособленный сервис-обертка над кошельками.

## Backend
Использует технологии:
- `Nest`
- `Postgres`
- `knex` (Возможно в будущем изменится на `Prisma`)

[Страница **DBDiogram**](https://dbdiagram.io/d/Exchanger-668bd1449939893dae53d0a0).

## Frontend
На данный момент отсутствует

## Описание проекта

### backend

#### Фильтры
В папке `/utils/filters` находятся обработчики ошибок. Данные фильтры применены ко всему приложению и отлавливают ошибки по всему приложению, а затем отправляют унифицированный ответ.

##### internalError.filter.ts
Данный фильтр отлавливает все внутренние ошибки. На данный момент функционал реализован не полностью, но в итоге при внутренней ошибке сервера Администратор и команда разработчиков должна будет уведомляться посредством email или бота в telegram.

##### responseError.filter.ts
Данный фильтр отлавливает ошибки со стороны пользователя и оборачивает ответ в унифицированный вид.

#### Интерцепторы
В папке `/utils/interceptors` находятся интерцепторы, которые позволяют перехватывать ответ сервера после выполнения метода контроллера, и перед отправкой его пользователю, то есть "В последний момент".

##### response.interceptor.ts
Данный интерцептор оборачивает ответ в унифицированный вид. Унифицированный вид выглядит следующим образом:
``` ts
{
  success: boolean,
  data: any | null
  message: string | null
  status: number
}
```
**success:**
Поле `success` является основным индикатором успешности запроса.  

**data и message:** случае успешного запроса `message` равен `null`, а в `data` находятся данные которые возвращает метод. В случае же запроса с ошибкой `data` будет равняться `null`, а в `message` будет находится сообщение об ошибке. 

**status:** поле `status` находится статус запроса и сделано это для удобства обработки со стороны фронтенда.
