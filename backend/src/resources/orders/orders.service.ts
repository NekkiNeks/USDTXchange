import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.prisma.client.order.findMany({ where: { userId } });
  }

  async findOne(id: string) {
    const order = await this.prisma.client.order.findFirst({ where: { id } });

    if (!order) throw new NotFoundException('Заявка с таким ID не была найдена');
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.client.order.update({ where: { id }, data: updateOrderDto });
  }

  remove(id: string) {
    return this.prisma.client.order.delete({ where: { id } });
  }
}
