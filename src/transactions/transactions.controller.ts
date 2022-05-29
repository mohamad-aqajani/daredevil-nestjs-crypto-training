import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { GasPriceRequest, GasPriceResponse } from './dto/gasPrice.dto';
import { TransactionRequest } from './dto/transacction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('fee')
  async getGasPrice(@Query() body: GasPriceRequest, @Req() request): Promise<GasPriceResponse> {
    return await this.transactionsService.getGasPrice(body, request?.user);
  }

  @Post('transaction')
  async transaction(@Body() body: TransactionRequest, @Req() request): Promise<GasPriceResponse> {
    return await this.transactionsService.transaction(body, request?.user);
  }
}
