import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';
import { RedisModule } from '@shared/modules/redis/redis.module';
import { Asset } from '@shared/entities/asset-entity';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User, Asset]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    RedisModule.register({ host: process.env.REDIS_ADDRESS, port: 6379 }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
