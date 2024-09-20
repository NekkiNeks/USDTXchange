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
    return this.prisma.client.employees.create({ data: createEmployeeDto });
  }

  async findAll() {
    const employees = await this.prisma.client.employees.findMany();
    return employees.map((employee) => SerializedEmployee.create(employee));
  }

  async findOne(id: string) {
    const employee = await this.prisma.client.employees.findFirst({ where: { id } });
    if (!employee) throw new BadRequestException('Сотрудник с таким ID не был найден.');
    return SerializedEmployee.create(employee);
  }

  async findOneByUsername(username: string) {
    const employee = await this.prisma.client.employees.findFirst({ where: { username } });
    if (!employee) throw new BadRequestException('Сотрудник с таким username не был найден.');
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // Пользователь может изменить только свои данные
    const updatedEmployee = await this.prisma.client.employees.update({
      where: { id },
      data: updateEmployeeDto,
    });

    return SerializedEmployee.create(updatedEmployee);
  }

  async remove(id: string) {
    // Может только администратор
    await this.prisma.client.employees.delete({ where: { id } });
    return id;
  }
}
