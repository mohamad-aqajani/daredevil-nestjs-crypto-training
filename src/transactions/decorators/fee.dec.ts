import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { GasPriceRequest, GasPriceResponse } from 'transactions/dto/gasPrice.dto';

export function FeeDec() {
  return applyDecorators(
    ApiBearerAuth(),
    // ApiQuery({type: GasPriceRequest}),
    ApiOkResponse({ type: GasPriceResponse, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
