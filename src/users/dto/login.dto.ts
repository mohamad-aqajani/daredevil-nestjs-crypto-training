import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsMobilePhone()
  @ApiProperty()
  mobile: string;
  
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(36)
  @ApiProperty()
  password: string;
}
