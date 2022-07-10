import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { BadRequestDto } from '@shared/dto';
import { GetWalletRequest } from 'wallets/dto/getWallet-request.dto';
import { GetWalletResponse, WalletInfo } from 'wallets/dto/getWallet-response.dto';

export function GetWalletsDec() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiQuery({type: GetWalletRequest}),
    ApiOkResponse({ type: GetWalletResponse , description: 'Successful', }),
    ApiBadRequestResponse({
      type: BadRequestDto,
      description: 'Bad request. Body properties are invalid.',
    }),
  );
}
