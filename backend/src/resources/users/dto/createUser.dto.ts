import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iCreateUser, iUser } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface iCreateUserDto extends iCreateUser {}

export class CreateUserDto implements iCreateUserDto {
  @ApiProperty({
    description: 'Логин пользователя',
    example: 'testuser123',
  })
  @IsString({ message: typeMessage('username', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('username') })
  username: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'testpass',
  })
  @IsString({ message: typeMessage('password', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('password') })
  password: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Дмитрий',
  })
  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Бойцов',
  })
  @IsString({ message: typeMessage('surname', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('surname') })
  surname: string;

  @ApiProperty({
    description: 'Телеграм аккаунт пользователя',
    example: 'telegayo',
  })
  @IsString({ message: typeMessage('telegram', 'string') })
  @IsOptional()
  telegram?: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'testuser@yandex.ru',
  })
  @IsString({ message: typeMessage('email', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('email') })
  email: string;
}
