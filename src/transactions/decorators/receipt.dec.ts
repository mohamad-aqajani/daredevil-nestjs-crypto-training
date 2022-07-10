import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiOkResponse, ApiQuery
} from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { TransactionReceiptRequest, TransactionReceiptResponse } from 'transactions/dto/txReceipt.dto';

export function ReceiptDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiQuery({type: TransactionReceiptRequest}),
    ApiOkResponse({ type: TransactionReceiptResponse, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
