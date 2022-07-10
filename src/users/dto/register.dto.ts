import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(36)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
