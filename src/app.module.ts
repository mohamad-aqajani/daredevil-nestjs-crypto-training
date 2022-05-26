import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@shared/entities/asset-entity';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
     
      useFactory: async () =>
      Object.assign(await 
       getConnectionOptions(), {
        autoLoadEntities: true,
      }),
    }),
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
