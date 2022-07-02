import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { GasPriceRequest, GasPriceResponse } from 'transactions/dto/gasPrice.dto';

export function FeeDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiQuery({type: GasPriceRequest}),
    ApiCreatedResponse({ type: GasPriceResponse, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
