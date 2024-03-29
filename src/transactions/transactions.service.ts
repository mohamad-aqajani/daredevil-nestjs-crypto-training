import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getGasPrice } from '@shared/contracts/utils/get-gas-preview.util';
import { getAllWallets, getUserWallet } from '@shared/contracts/utils/get-wallet.util';
import { transactOnLedger } from '@shared/contracts/utils/transaction.util';
import { transferHistory } from '@shared/contracts/utils/tx-history.util';
import { Asset } from '@shared/entities/asset-entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { GasPriceRequest, GasPriceResponse } from './dto/gasPrice.dto';
import { TransactionRequest, TransactionResponse } from './dto/transacction.dto';
import { TransactionHistoryRequest, TransactionHistoryResponse } from './dto/txHistory.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getGasPrice(body: GasPriceRequest, user: any): Promise<GasPriceResponse> {
    try {
      const asset = await this.assetRepository.findOne({ id: body.assetId });
      const wallet = await getUserWallet(user?.id, asset);
      const fee = await getGasPrice({
        symbol: body.coin,
        network: asset.network,
        sourceAddress: wallet?.address,
        receiverAddress: body.receiverAddress,
        amount: body.amount,
        userId: user?.id,
        ...(asset?.contractAbi ? { contractAbi: asset?.contractAbi } : {}),
        ...(asset?.contractAddress ? { contractAddress: asset?.contractAddress } : {}),
      });
      return {
        fee,
        totalFee: fee,
        totalCost: +fee + +body.amount,
        coin: body.coin,
        sourceAddress: wallet?.address,
        receiverAddress: body.receiverAddress,
        amount: body.amount,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async transaction(body: TransactionRequest, user: any): Promise<TransactionResponse> {
    const { receiverAddress, gas, amount, assetId } = body;
    try {
      const asset = await this.assetRepository.findOne({ id: assetId });
      const wallet = await getUserWallet(user?.id, asset);
      const TXHash = await transactOnLedger({
        sourceAddress: wallet?.address,
        receiverAddress,
        gas,
        amount,
        userId: user?.id,
        asset,
      });
      console.log({ TXHash });

      /** create transaction row */
      let transactionData = {
        receiverAddress,
        hash: TXHash,
        sourceAddress: wallet?.address,
        asset: asset,
        user: user,
      };

      console.log({ transactionData });
      const transaction = await this.transactionRepository.save(transactionData);
      return {
        hash: transaction?.hash,
        coin: asset.name,
        amount,
        receiverAddress: transaction?.receiverAddress,
        sourceAddress: transaction?.sourceAddress,
      };
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException({ message: error.message });
    }
  }

  async getUserTransactions(
    body: TransactionHistoryRequest,
    user: any,
  ): Promise<Array<TransactionHistoryResponse>> {
    const { assetId } = body;
    const asset = await this.assetRepository.findOne({ id: assetId });
    const wallet = await getUserWallet(user?.id, asset);

    return await transferHistory({
      userId: user?.id,
      asset,
      sourceAddress: wallet?.address,
    });
  }
}
