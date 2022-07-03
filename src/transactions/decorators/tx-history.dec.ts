import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import {
  TransactionHistoryRequest,
  TransactionHistoryResponse,
} from 'transactions/dto/txHistory.dto';

export function TransactionHistoryDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiQuery({ type: TransactionHistoryRequest }),
    ApiCreatedResponse({ type: TransactionHistoryResponse, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
