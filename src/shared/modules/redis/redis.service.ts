import { Injectable } from '@nestjs/common';
import { Config } from './redis.module';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly config: Config;
  private client: Redis;

  constructor(config: Config) {
    this.config = config;
    this.client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
    });
  }

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async set(
    key: string,
    value: string | number | Buffer,
    secondsToken: 'EX',
    seconds: number | string,
  ): Promise<'OK'> {
    return await this.client.set(key, value, secondsToken, seconds);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
