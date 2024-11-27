import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { IUserInfo, UserInfo } from 'src/utils/decorators/User.decorator';
import userType from 'src/types/userType';
import { ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Создание заявки на обмен',
    description: 'Возвращает сущность заявки',
  })
  create(@UserInfo() userInfo: IUserInfo, @Body() createOrderDto: CreateOrderDto) {
    // Если заявку создает пользователь - заявка создается на него.
    // Если заявку создает сотрудник - он должен передать ID пользователя, на которого будет создана заявка.

    if (userInfo.type === userType.EMPLOYEE && !createOrderDto.userId) {
      throw new BadRequestException('Ошибка при создании заявки: Сотрудник должен передавать ID пользователя.');
    }

    const userId = userType.EMPLOYEE ? createOrderDto.userId : userInfo.id;

    return this.ordersService.create(createOrderDto, userId);
  }

  @Get()
  @Roles('ADMIN', 'SENIOR_MANAGER', 'MANAGER')
  @ApiOperation({
    summary: 'Получение всех заявок в системе',
    description: 'Возвращает массив заявок',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение заявки по ID',
    description: 'Возвращает сущность заявки',
  })
  findOneById(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Получение всех заявок определенного пользователя',
    description: 'Возвращает массив заявок',
  })
  findAllByUserId(@Param('id') userId: string) {
    return this.ordersService.findAllByUserId(userId);
  }

  @Get('user/my')
  @ApiOperation({
    summary: 'Получение всех заявок пользователя, который делает запрос',
    description: 'Возвращает массив заявок',
  })
  findAllUsersOrders(@UserInfo() user: IUserInfo) {
    if (user.type === userType.EMPLOYEE) {
      const errorMessage = 'Ошибка при получении заявок пользователя: Вы являетесь сотрудником, а не пользователем.';
      throw new BadRequestException(errorMessage);
    }

    const userId = user.id;

    return this.ordersService.findAllByUserId(userId);
  }

  @Get('employee/my')
  @Roles('ADMIN', 'MANAGER', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Получение всех заявок, назначенных на определенного сотрудника',
    description: 'Возвращает массив заявок',
  })
  findAllEmployeesOrders(@UserInfo() employee: IUserInfo) {
    const managerId = employee.id;

    return this.ordersService.findAllEmployeesOrders(managerId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление данных заявки',
    description: 'Возвращает сущность обновленной заявки',
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление данных заявки',
    description: 'Возвращает сущность удаленной заявки',
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
