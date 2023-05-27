import { IsEmail } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  readonly password: string;
}
