import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployee';
import { UpdateEmployeeDto } from './dto/updateEmployee';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { SerializedEmployee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // Может только администратор
    return this.prisma.client.employee.create({ data: createEmployeeDto });
  }

  async findAll() {
    const employees = await this.prisma.client.employee.findMany();
    return employees.map((employee) => SerializedEmployee.create(employee));
  }

  async findOne(id: string) {
    const employee = await this.prisma.client.employee.findFirst({ where: { id } });
    if (!employee) throw new BadRequestException('Сотрудник с таким ID не был найден.');
    return SerializedEmployee.create(employee);
  }

  async findOneByUsername(username: string) {
    const employee = await this.prisma.client.employee.findFirst({ where: { username } });
    if (!employee) throw new BadRequestException('Сотрудник с таким username не был найден.');
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // Пользователь может изменить только свои данные
    const updatedEmployee = await this.prisma.client.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });

    return SerializedEmployee.create(updatedEmployee);
  }

  async remove(id: string) {
    // Может только администратор
    await this.prisma.client.employee.delete({ where: { id } });
    return id;
  }

  // Дополнительные методы:

  /**
   * Данный метод возвращает пользователя, у которого меньше всего активных заявок в данное время.
   */
  async getManagerWithLessActiveOrders() {
    // TODO: Переделать на более гибкую логику. На данный момент все будет сыпаться на одного сотрудника если он будет быстро все разгребать.
    // Так же возможно проще будет переписать данный запрос на чистый SQL

    return await this.prisma.client.employee.findFirst({
      where: {
        orders: {
          none: {
            status: 'FULLFILLED', // Исключаем заявки со статусом FULLFILLED
          },
        },
      },
      orderBy: {
        orders: {
          _count: 'asc', // Сортируем по количеству заявок в порядке возрастания
        },
      },
      include: {
        orders: {
          where: {
            status: {
              not: 'FULLFILLED', // Считаем только заявки, которые не в статусе FULLFILLED
            },
          },
        },
      },
    });
  }
}
