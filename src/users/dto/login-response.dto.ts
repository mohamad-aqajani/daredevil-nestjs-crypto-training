import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'users/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty()
  data: User;

  @ApiProperty()
  access_token: string;
}
