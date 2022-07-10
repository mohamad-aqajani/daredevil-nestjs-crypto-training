import { OmitType, PickType } from '@nestjs/swagger';
import { PaginationDto } from '@shared/dto';
import { IsPositive } from 'class-validator';

export class GetWalletRequest extends PaginationDto {}
