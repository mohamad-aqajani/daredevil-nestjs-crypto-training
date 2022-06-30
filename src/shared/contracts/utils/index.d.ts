import { Asset } from '@shared/entities/asset-entity';
import { NetworkType } from 'enums/network.enum';
import { SymbolWalletType } from '../wallets/types';

export declare type WalletInfo = {
  balance: number;
  address: string;
  logo: string;
  name: string;
  symbol: SymbolWalletType;
};

export declare type GetGasInput = {
  amount?: number;
  sourceAddress?: string;
  receiverAddress?: string;
  contractAddress?: string;
  network?: NetworkType;
  contractAbi?: string;
  symbol?: SymbolWalletType;
  isContract?: boolean;
  userId: number;
};

export declare type GetGasOutput = {
  gasPrice: string;
  gasLimit: string;
  gasFee: string;
  totalFee: string;
  totalCost: string;
};

export declare type GetWalletInput = {
  index: number;
  assets: Asset[];
  mnemonic?: string;
};

export declare type GetWalletOutput = {
  wallets: WalletInfo[];
};

export declare type TransactionInput = {
  sourceAddress: string;
  receiverAddress: string;
  amount: number;
  privateKey?: string;
  digits?: number;
  userId?: number;
  asset: Asset;
  gas: number;
};

export declare type TransferHistoryInput = {
  userId: number;
  asset: Asset;
  sourceAddress: string;
};
