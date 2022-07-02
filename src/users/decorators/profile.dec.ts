import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { GetProfileResponseDto } from 'users/dto/profile.dto';

export function ProfileDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiCreatedResponse({ type: GetProfileResponseDto, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
