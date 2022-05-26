import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from '@shared/entities/asset-entity';
import { RedisService } from '@shared/modules/redis/redis.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Asset)
    private readonly AssetRepository: Repository<Asset>,
    // private readonly redisService: RedisService
  ) {}

  async findOne(mobile: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobile } });
  }
}
