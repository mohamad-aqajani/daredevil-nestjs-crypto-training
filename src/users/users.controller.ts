import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DogeWallet } from '@shared/contracts/wallets/doge-wallet';
import { BtcWallet, EthWallet, XrpWallet } from '@shared/contracts/wallets';
import { Public } from '@shared/decorators/public.decorator';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/passport/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/passport/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { User } from './entities/user.entity';
import * as xrpl from 'xrpl';
import { xrpBalance } from '@shared/contracts/balance/xrp-balance';
import { xrpGas } from '@shared/contracts/gas/xrp-gas';
import { ethGas } from '@shared/contracts/gas/eth-gas';
import { btcGas } from '@shared/contracts/gas/btc-gas';
import { dogeBalance } from '@shared/contracts/balance/doge-balance';

@Controller()
export class UsersController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @Public()
  @Post('auth/verify')
  async verify(@Body() body: VerifyDto) {
    return this.authService.verifyOtp(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<{ data: User }> {
    return {
      data: req.user,
    };
  }
  @Get('doge')
  @Public()
  async  doge() {
    const wallet = xrpl.Wallet.fromSecret('ssADEV685jaTGsjTFVJyCojffjBUS');
    const toWallet = await XrpWallet(4
    );
    xrpl.Wallet.fromSecret('ssADEV685jaTGsjTFVJyCojffjBUS');

      // return xrpGas(wallet,toWallet.address, 5)
      // return await ethGas(
      //   "0xd3C7B12e92a9305710389F5029C9cA2084db99c6",
      //   "0xd3C7B12e92a9305710389F5029C9cA2084db99c6"
      // )
      // return await btcGas('mx2TngwSiYd4wn7ixvYHMtdngYRvWjw77L')
      return await DogeWallet('paddle minute code kid ahead permit sand guitar pave boy decide zero', 1);
      // return await dogeBalance('DKUqsn2uQ8iBamthjG5a41nN37Tnd1RvW2')
  }
}
