import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { RegisterResponseDto } from 'users/dto/register-response.dto';
import { RegisterDto } from 'users/dto/register.dto';

export function RegisterDec() {
  return applyDecorators(
    ApiBody({ type: RegisterDto }),
    ApiCreatedResponse({ type: RegisterResponseDto, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
