import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { dogeTxHistory, ethTxHistoryByBlock } from '@shared/contracts/tx-history';
import { xrpTxHistoryByBlock } from '@shared/contracts/tx-history/xrp.history';
import { Public } from '@shared/decorators/public.decorator';
import { AuthService } from 'auth/auth.service';
import { Wallet } from 'xrpl';
import { LoginDec } from './decorators/login.dec';
import { ProfileDec } from './decorators/profile.dec';
import { RegisterDec } from './decorators/register.dec';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller()
export class UsersController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @LoginDec()
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @RegisterDec()
  @Post('auth/register')
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @Public()
  @Post('auth/verify')
  async verify(@Body() body: VerifyDto) {
    return this.authService.verifyOtp(body);
  }
  @ProfileDec()
  @Get('profile')
  async getProfile(@Request() req): Promise<{ data: User }> {
    return {
      data: req.user,
    };
  }
  @Get('test')
  @Public()
  async test() {
    return await ethTxHistoryByBlock('0xd3C7B12e92a9305710389F5029C9cA2084db99c6');
  }
}
