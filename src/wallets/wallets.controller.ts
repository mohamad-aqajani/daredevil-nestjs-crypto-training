import { Controller, Get, Req } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Get('/')
  async getWallets(@Req() request) {
    return this.walletsService.getWalletsInfo(request.user);
  }
}
