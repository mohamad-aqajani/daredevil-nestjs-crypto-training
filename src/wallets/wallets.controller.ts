import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { GetWalletsDec } from './decorators/getWallets.dec';
import { GetWalletRequest } from './dto/getWallet-request.dto';
import { WalletsService } from './wallets.service';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @GetWalletsDec()
  @Get('/')
  async getWallets(@Query() query: GetWalletRequest, @Req() request) {
    return this.walletsService.getWalletsInfo(query ,request.user);
  }
}
