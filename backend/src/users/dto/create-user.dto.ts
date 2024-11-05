import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}
