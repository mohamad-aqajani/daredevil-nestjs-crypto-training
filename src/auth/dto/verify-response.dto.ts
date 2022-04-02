import { User } from 'users/entities/user.entity';

export class VerifyResponseDto {
  data: Partial<User>;
  access_token: string;
}
