import { BadRequestException, ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { SerializedEmployee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    // Может только администратор
    return this.prisma.client.employees.create({ data: createEmployeeDto });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    const employees = await this.prisma.client.employees.findMany();
    return employees.map((employee) => new SerializedEmployee(employee));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(id: string) {
    const employee = await this.prisma.client.employees.findFirst({ where: { id } });
    if (!employee) throw new BadRequestException('Пользователь с таким ID не был найден.');
    return new SerializedEmployee(employee);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // Пользователь может изменить только свои данные
    return this.prisma.client.employees.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: string) {
    // Может только администратор
    return this.prisma.client.employees.delete({ where: { id } });
  }
}
