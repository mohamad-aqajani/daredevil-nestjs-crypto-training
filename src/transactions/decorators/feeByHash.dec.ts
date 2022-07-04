import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { FeeByHashRequest } from 'transactions/dto/feeByHash.dto';

export function FeeByHashDec() {
  return applyDecorators(
    ApiQuery({type: FeeByHashRequest}),
    ApiCreatedResponse({ type: Number, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
