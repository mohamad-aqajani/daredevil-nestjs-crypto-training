import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { WalletInfo } from 'wallets/dto/getWallet-response.dto';

export function GetWalletsDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiCreatedResponse({ type: WalletInfo, description: 'Successful' }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
