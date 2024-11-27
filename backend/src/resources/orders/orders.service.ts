import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { orderStatus } from '@prisma/client';
import { EmployeesService } from '../employees/employees.service';
import { iCreateOrder } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private employeesService: EmployeesService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    // Создание заявки в БД
    let managerId = createOrderDto.managerId;

    // Если менеджер не был передан, то назначается тот, у кого меньше всего заявок
    if (managerId) {
      const manager = await this.employeesService.getManagerWithLessActiveOrders();
      managerId = manager.id;
    }

    const data: iCreateOrder = {
      ...createOrderDto,
      managerId,
      userId,
    };

    return this.prisma.client.order.create({ data });
  }

  findAll(status?: orderStatus, take?: number) {
    let where: Record<string, any>;

    if (status) where.status = status;

    return this.prisma.client.order.findMany({ where, take });
  }

  findAllByUserId(userId: string) {
    return this.prisma.client.order.findMany({});
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
