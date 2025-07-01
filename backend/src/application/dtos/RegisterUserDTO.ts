import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;
}