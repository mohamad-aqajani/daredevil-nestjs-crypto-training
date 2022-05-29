import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { GasPriceRequest, GasPriceResponse } from './dto/gasPrice.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('fee')
  async getGasPrice(@Query() body: GasPriceRequest, @Req() request): Promise<GasPriceResponse> {
    return await this.transactionsService.getGasPrice(body, request?.user);
  }
}
