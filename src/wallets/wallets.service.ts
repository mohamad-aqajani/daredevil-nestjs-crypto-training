import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getAllWallets } from '@shared/contracts/utils/get-wallet.util';
import { Asset } from '@shared/entities/asset-entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { WalletInfo } from './dto/getWallet-response.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) // private readonly redisService: RedisService
  {}

  async getWalletsInfo(user: User): Promise<WalletInfo[]> {
    return getAllWallets(user.id, await this.assetRepository.find());
  }
}
