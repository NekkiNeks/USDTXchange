import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return this.prisma.client.employees.findMany();
  }

  findOne(id: string) {
    return this.prisma.client.employees.findFirst({ where: { id } });
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return `This action removes a #${id} employee`;
  }
}
