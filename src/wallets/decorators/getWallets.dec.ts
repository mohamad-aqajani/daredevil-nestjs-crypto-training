import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { WalletInfo } from 'wallets/dto/getWallet-response.dto';

export function GetWalletsDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({ type: WalletInfo , description: 'Successful', isArray: true }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
