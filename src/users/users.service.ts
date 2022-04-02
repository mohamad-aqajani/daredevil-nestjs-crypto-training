import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '@shared/modules/redis/redis.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly redisService: RedisService
  ) {}

  async findOne(mobile: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobile } });
  }
}
