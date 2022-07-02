import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsMobilePhone()
  mobile: string;
  
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(36)
  password: string;
}
