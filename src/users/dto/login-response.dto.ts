import { ApiExtraModels, ApiProperty, ApiResponse, getSchemaPath, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { User } from 'users/entities/user.entity';

class Data extends OmitType(User, ['transactions', 'createdAt', 'updatedAt', 'deletedAt', 'password']) {}
export class LoginResponseDto {
  data: Data;
  access_token: string;
}
