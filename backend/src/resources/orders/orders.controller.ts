import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { IUserInfo, UserInfo } from 'src/utils/decorators/User.decorator';
import userType from 'src/types/userType';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
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
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('user/:id')
  findAllByUserId() {
    // Получение всех заявок определенного пользователя
  }

  @Get('user/my')
  findAllUsersOrders(@UserInfo() user: IUserInfo) {
    if (user.type === userType.EMPLOYEE) {
      const errorMessage = 'Ошибка при получении заявок пользователя: Вы являетесь сотрудником, а не пользователем.';
      throw new BadRequestException(errorMessage);
    }

    const userId = user.id;

    // Получение всех заявок по id пользователя
  }

  @Get('employee/my')
  @Roles('ADMIN', 'MANAGER', 'SENIOR_MANAGER')
  findAllEmployeesOrders(@UserInfo() employee: IUserInfo) {
    const employeeId = employee.id;

    // Получение всех заявок, назначенных на данного сотрудника
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
