import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { nonEmptyMessage, typeMessage } from 'src/utils/heplers/validationErrorMessageGenerators';
import { iUser } from '../../users/entities/user.entity';

export class RegisterUserDto implements Partial<iUser> {
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
  @IsOptional()
  telegram?: string;

  @IsString({ message: typeMessage('email', 'string') })
  @IsNotEmpty({ message: nonEmptyMessage('email') })
  email: string;
}