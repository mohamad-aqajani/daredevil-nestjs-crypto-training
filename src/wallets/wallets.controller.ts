import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWalletsDec } from './decorators/getWallets.dec';
import { WalletsService } from './wallets.service';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @GetWalletsDec()
  @Get('/')
  async getWallets(@Req() request) {
    return this.walletsService.getWalletsInfo(request.user);
  }
}
