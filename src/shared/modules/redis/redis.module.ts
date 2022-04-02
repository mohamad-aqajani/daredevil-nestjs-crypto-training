import { Module, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';

export interface Config {
  host: string;
  port?: number;
  password?: string;
}

@Module({})
export class RedisModule {
  static register(options: Config): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: RedisService,
          useValue: new RedisService(options),
        },
      ],
      exports: [RedisService],
    };
  }
}
