import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { TransactionRequest, TransactionResponse } from 'transactions/dto/transacction.dto';

export function TransactionDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: TransactionRequest }),
    ApiCreatedResponse({ type: TransactionResponse, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
