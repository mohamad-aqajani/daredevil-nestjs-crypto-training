import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TxReceipt } from '@shared/contracts/tx-receipt/types';
import { User } from 'users/entities/user.entity';
import { FeeDec } from './decorators/fee.dec';
import { FeeByHashDec } from './decorators/feeByHash.dec';
import { ReceiptDec } from './decorators/receipt.dec';
import { TransactionDec } from './decorators/transaction.dec';
import { TransactionHistoryDec } from './decorators/tx-history.dec';
import { FeeByHashRequest } from './dto/feeByHash.dto';
import { GasPriceRequest, GasPriceResponse } from './dto/gasPrice.dto';
import { TransactionRequest, TransactionResponse } from './dto/transacction.dto';
import { TransactionHistoryRequest, TransactionHistoryResponse } from './dto/txHistory.dto';
import { TransactionReceiptRequest, TransactionReceiptResponse } from './dto/txReceipt.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @FeeDec()
  @Get('estimate-fee')
  async getGasPrice(@Query() body: GasPriceRequest, @Req() request): Promise<GasPriceResponse> {
    return await this.transactionsService.getGasPrice(body, request?.user);
  }

  @TransactionDec()
  @Post('/')
  async transaction(
    @Body() body: TransactionRequest,
    @Req() request,
  ): Promise<TransactionResponse> {
    return await this.transactionsService.transaction(body, request?.user);
  }

  @TransactionHistoryDec()
  @Get('/history')
  async getUserTransactions(
    @Query() query: TransactionHistoryRequest,
    @Req() request,
  ): Promise<TransactionHistoryResponse[]> {
    return await this.transactionsService.getUserTransactions(query, request?.user);
  }

  @FeeByHashDec()
  @Get('/history/fee')
  async getFeeByHash(@Query() query: FeeByHashRequest): Promise<number> {
    return await this.transactionsService.getFeeByHash(query);
  }

  @ReceiptDec()
  @Get('/receipt')
  async getTxReceipt(
    @Query() query: TransactionReceiptRequest ,
  ): Promise<TransactionReceiptResponse> {
    return await this.transactionsService.getTransactionReceipt(query);
  }
}
