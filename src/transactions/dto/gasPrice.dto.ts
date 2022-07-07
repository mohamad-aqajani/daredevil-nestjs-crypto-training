import { SymbolWalletType } from '@shared/contracts/wallets/types';

export class GasPriceRequest {
  coin:SymbolWalletType | string;
  amount: number;
  receiverAddress: string;
  assetId: number
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
