import { SymbolWalletType } from '@shared/contracts/wallets/types';
import { AssetType } from 'enums/assets.enum';
import { NetworkType } from 'enums/network.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

@Entity()
export class Asset extends BaseEntity {
  @Column()
  name: string;

  @Column()
  symbol: SymbolWalletType;

  @Column()
  decimals?: number;

  @Column({ nullable: true })
  logo: string;

  @Column({ type: 'enum', enum: AssetType, default: AssetType.COIN })
  type: AssetType;

  @Column({ nullable: true })
  contractAddress?: string;

  @Column({ nullable: true })
  contractAbi?: string;

  @Column({ nullable: true, type: 'enum', enum: NetworkType })
  network?: NetworkType;

  @Column({ nullable: true })
  contractType?: string;
}
