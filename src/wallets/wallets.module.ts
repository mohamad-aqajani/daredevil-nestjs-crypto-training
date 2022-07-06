import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@shared/entities/asset-entity';
import { RedisModule } from '@shared/modules/redis/redis.module';
import { User } from 'users/entities/user.entity';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, Asset]),
    RedisModule.register({ host: process.env.REDIS_ADDRESS, port: 6379 }),
    HttpModule,
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
