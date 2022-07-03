import { OmitType } from '@nestjs/swagger';
import { User } from 'users/entities/user.entity';
export class GetProfileResponseDto extends OmitType(User, [
  'transactions',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'password',
]) {}
