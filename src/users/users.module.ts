import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@shared/entities/asset-entity';
import { RedisModule } from '@shared/modules/redis/redis.module';
import { RedisService } from '@shared/modules/redis/redis.service';
import { AuthService } from 'auth/auth.service';
import { JwtStrategy } from 'auth/passport/jwt.strategy';
import { LocalStrategy } from 'auth/passport/local.strategy';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, Asset]),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    RedisModule.register({host:'localhost', port: 6379}),
    HttpModule
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
