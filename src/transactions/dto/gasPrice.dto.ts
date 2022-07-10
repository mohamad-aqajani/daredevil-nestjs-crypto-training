import { SymbolWalletType } from '@shared/contracts/wallets/types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GasPriceRequest {
  coin: SymbolWalletType | string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  @IsString()
  receiverAddress: string;

  @IsNotEmpty()
  @IsNumber()
  assetId: number;
}

export class GasPriceResponse {
  coin: SymbolWalletType | string;
  amount: number;
  receiverAddress: string;
  sourceAddress: string;
  fee: number;
  totalFee: number;
  totalCost: number;
}
