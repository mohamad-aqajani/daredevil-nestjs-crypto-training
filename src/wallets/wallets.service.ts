import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getAllWallets } from '@shared/contracts/utils/get-wallet.util';
import { Asset } from '@shared/entities/asset-entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { GetWalletRequest } from './dto/getWallet-request.dto';
import { GetWalletResponse, WalletInfo } from './dto/getWallet-response.dto';
import { paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>, // private readonly redisService: RedisService
  ) {}

  async getWalletsInfo(query: GetWalletRequest, user: User): Promise<GetWalletResponse> {
    const [wallets, count] = await this.assetRepository.findAndCount({
      skip: query?.page,
      take: query?.limit,
    });
    console.log({ count });
    const result = await getAllWallets(user.id, wallets);
    // return paginate(wallets, {limit, page})
    return {
      items: result,
      meta: {
        currentPage: query?.page,
        itemCount: query?.limit,
        totalItems: count,
        totalPages: count / query?.limit,
      },
    };
  }
}
