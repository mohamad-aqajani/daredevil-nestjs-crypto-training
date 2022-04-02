import { User } from 'users/entities/user.entity';

export class LoginResponseDto {
  data: Partial<User>;
  access_token: string;
}
