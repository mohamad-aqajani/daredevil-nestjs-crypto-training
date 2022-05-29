import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getGasPrice } from '@shared/contracts/utils/get-gas-preview.util';
import { getAllWallets, getUserWallet } from '@shared/contracts/utils/get-wallet.util';
import { Asset } from '@shared/entities/asset-entity';
import { Repository } from 'typeorm';
import { GasPriceRequest, GasPriceResponse } from './dto/gasPrice.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async getGasPrice(body: GasPriceRequest, user: any): Promise<GasPriceResponse> {
    try {
      const asset = await this.assetRepository.findOne({ id: body.id });
      const sourceAddress = await getUserWallet(user?.id, asset);
      const fee = await getGasPrice({
        symbol: body.coin,
        network: asset.network,
        sourceAddress,
        receiverAddress: body.receiverAddress,
        amount: body.amount,
        userId: user?.id,
        ...(asset?.contractAbi ?{contractAbi: asset?.contractAbi}: {}),
        ...(asset?.contractAddress ?{contractAddress: asset?.contractAddress}: {}),
      });
      return {
        fee,
        totalFee: fee,
        totalCost: +fee + +body.amount,
        coin: body.coin,
        sourceAddress,
        receiverAddress: body.receiverAddress,
        amount: body.amount,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
