import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { SerializedUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.client.user.create({ data: createUserDto });
    return SerializedUser.create(newUser);
  }

  async findAll() {
    const users = await this.prisma.client.user.findMany();
    return users.map((user) => SerializedUser.create(user));
  }

  async findOneById(id: string) {
    const user = await this.prisma.client.user.findFirst({ where: { id } });
    return SerializedUser.create(user);
  }

  async findOneByUsername(username: string) {
    const user = await this.prisma.client.user.findFirst({ where: { username } });
    if (!user) throw new BadRequestException('Пользователь с таким username не был найден.');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.client.user.update({ where: { id }, data: updateUserDto });
    return SerializedUser.create(updatedUser);
  }

  async remove(id: string) {
    await this.prisma.client.user.delete({ where: { id } });
    return id;
  }
}
