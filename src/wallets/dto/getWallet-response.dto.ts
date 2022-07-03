import { Asset } from "@shared/entities/asset-entity";

export class WalletInfo {
  balance: number;
  asset: Omit<Asset, 'contractAbi'>
  address: string;
}
