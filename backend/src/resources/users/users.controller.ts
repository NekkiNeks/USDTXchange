import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { UserInfo } from 'src/utils/decorators/User.decorator';
import iJwtPayload from 'src/types/jwtPayload';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('ADMIN', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Создание пользователя',
    description: 'Возвращает сущность созданного пользователя',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Получение всех пользователей в системе',
    description: 'Возвращает массив пользователей',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение пользователя по ID',
    description: 'Возвращает сущность пользвателя',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Обновление данных пользователя',
    description: 'Возвращает сущность обновленного пользвателя',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch()
  @ApiOperation({
    summary: 'Обновление данных пользователя, который делает запрос',
    description: 'Возвращает сущность обновленного пользвателя',
  })
  updateMyself(@UserInfo() user: iJwtPayload, userUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, UpdateUserDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SENIOR_MANAGER')
  @ApiOperation({
    summary: 'Удаление пользователя',
    description: 'Возвращает сущность удаленного пользвателя',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Удаление данных пользователя, который делает запрос',
    description: 'Возвращает сущность удаленного пользвателя',
  })
  deleteMyself(@Req() request: Request, @UserInfo() user: iJwtPayload) {
    request.res.clearCookie('accessToken');
    request.res.clearCookie('refreshToken');
    return this.usersService.update(user.id, UpdateUserDto);
  }
}
