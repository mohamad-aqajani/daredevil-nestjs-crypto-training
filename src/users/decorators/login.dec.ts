import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { LoginResponseDto } from 'users/dto/login-response.dto';
import { LoginDto } from 'users/dto/login.dto';
import { Public } from '@shared/decorators/public.decorator';
export function LoginDec() {
  return applyDecorators(
    ApiBody({ type: LoginDto }),
    Public(),
    ApiCreatedResponse({ type: LoginResponseDto, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
