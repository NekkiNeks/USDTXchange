import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';

export class LoginUserDto {
  @ApiProperty({
    description: 'логин пользователя',
    example: 'testuser123',
  })
  @IsString({ message: typeMessage('username', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('username') })
  username: string;

  @ApiProperty({
    description: 'пароль пользователя',
    example: 'testpass',
  })
  @IsString({ message: typeMessage('password', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('password') })
  password: string;
}
