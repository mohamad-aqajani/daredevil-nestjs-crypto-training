import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponseDto } from '@shared/dto';
import { Asset } from '@shared/entities/asset-entity';

class AssetType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  decimals?: number;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  contractAddress?: string;

  @ApiProperty()
  network?: string;

  @ApiProperty()
  contractType?: string;
}
export class WalletInfo {
  balance: number;
  asset: AssetType;
  address: string;
}

export class GetWalletResponse extends PaginationResponseDto {
  items: WalletInfo[];
}
