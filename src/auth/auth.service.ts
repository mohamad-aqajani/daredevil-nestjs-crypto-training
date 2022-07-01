import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'users/dto/login.dto';
import { RedisService } from '@shared/modules/redis/redis.service';
import { VerifyDto } from 'users/dto/verify.dto';
import { LoginResponseDto } from '../users/dto/login-response.dto';
import { VerifyResponseDto } from 'users/dto/verify-response.dto';
import { RegisterDto } from 'users/dto/register.dto';
import { RegisterResponseDto } from 'users/dto/register-response.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private redisService: RedisService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(mobile: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(mobile);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { mobile: body.mobile },
    });

    if (!user) throw new BadRequestException('User Not Found');
    if (!(await bcrypt.compare(body.password, user.password)))
      throw new BadRequestException('Invalid Password!');

    const payload = { mobile: user.mobile, sub: user.id };
    return {
      data: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: RegisterDto): Promise<RegisterResponseDto> {
    if (await this.userRepository.findOne({ where: { mobile: body.mobile } }))
      throw new HttpException('User Already Exists!', HttpStatus.BAD_REQUEST);
    try {
      // const entity = Object.assign(new User(), body);
      // const user = await this.userRepository.save(entity);
      // const { password, ...result } = user;
      // return result;
      const otp = Math.floor(100000 + Math.random() * 900000);
      const savedUserTemp = await this.redisService.set(
        `register_${body.mobile}`,
        JSON.stringify({
          otp,
          user: body,
        }),
        'EX',
        420,
      );
      if (savedUserTemp === 'OK') {
        return {
          message: 'User Registered Successfully!',
          code: otp,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
  }

  async verifyOtp({ mobile, code }: VerifyDto): Promise<VerifyResponseDto> {
    const userTemp = await this.redisService.get(`register_${mobile}`);
    if (!userTemp) throw new BadRequestException('Invalid User!');
    const { otp, user: userData } = JSON.parse(userTemp);
    if (otp !== +code) throw new BadRequestException('Invalid OTP!');
    const entity = Object.assign(new User(), userData);
    const user = await this.userRepository.save(entity);
    if (user) await this.redisService.del(`register_${mobile}`);
    const { password, ...data } = user;
    const payload = { mobile: user.mobile, sub: user.id };
    return { data, access_token: this.jwtService.sign(payload) };
  }
}
