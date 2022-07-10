import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class VerifyDto {
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  @IsNumber()
  code: string | number;
}
