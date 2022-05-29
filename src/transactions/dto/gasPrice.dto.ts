import { SymbolWalletType } from '@shared/contracts/wallets/types';

export class GasPriceRequest {
  coin?: SymbolWalletType;
  amount: number;
  receiverAddress: string;
  id: number
}

export class GasPriceResponse {
  coin: SymbolWalletType;
  amount: number;
  receiverAddress: string;
  sourceAddress: string;
  fee: number;
  totalFee: number;
  totalCost: number;
}
