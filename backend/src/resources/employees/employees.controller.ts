import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/createEmployee';
import { UpdateEmployeeDto } from './dto/updateEmployee';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { UserInfo } from 'src/utils/decorators/User.decorator';
import iJwtPayload from 'src/types/jwtPayload';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Создание сотрудника',
    description: 'Возвращает сущность сотрудника',
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Получить всех сотрудников',
    description: 'Возвращает массив сотрудников',
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить определенного сотрудника по ID',
    description: 'Возвращает сущность сотрудника',
  })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Обновление данных сотрудника',
    description: 'Возвращает сущность обновленного сотрудника',
  })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Patch()
  @Roles('ADMIN', 'SENIOR_MANAGER', 'MANAGER')
  @ApiOperation({
    summary: 'Обновление собственных данных сотрудника',
    description: 'Возвращает сущность обновленного сотрудника \n\n**Роли**: администратор, старший менеджер, менеджер',
  })
  updateMyself(@UserInfo() employee: iJwtPayload, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(employee.id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Удаление сущности сотрудника',
    description: 'Возвращает удаленного сотрудника (Роли: администратор)',
  })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
