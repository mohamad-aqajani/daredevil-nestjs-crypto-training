import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Public } from '@shared/decorators/public.decorator';
import { BadRequestDto } from '@shared/dto';
import { VerifyResponseDto } from 'users/dto/verify-response.dto';
import { VerifyDto } from 'users/dto/verify.dto';

export function VerifyDec() {
  return applyDecorators(
    Public(),
    ApiBody({ type: VerifyDto }),
    ApiCreatedResponse({ type: VerifyResponseDto, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
