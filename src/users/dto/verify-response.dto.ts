import { OmitType } from '@nestjs/swagger';
import { User } from 'users/entities/user.entity';
class Data extends OmitType(User, [
  'transactions',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'password',
]) {}

export class VerifyResponseDto {
  data: Data;
  access_token: string;
}
