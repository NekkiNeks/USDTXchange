import { IsNotEmpty, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iCreateUser, iUser } from '../entities/user.entity';

export interface iCreateUserDto extends iCreateUser {}

export class CreateUserDto implements iCreateUserDto {
  @IsString({ message: typeMessage('username', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('username') })
  username: string;

  @IsString({ message: typeMessage('password', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('password') })
  password: string;

  @IsString({ message: typeMessage('name', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('name') })
  name: string;

  @IsString({ message: typeMessage('surname', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('surname') })
  surname: string;

  @IsString({ message: typeMessage('telegram', 'string') })
  telegram?: string;

  @IsString({ message: typeMessage('email', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('email') })
  email: string;
}
