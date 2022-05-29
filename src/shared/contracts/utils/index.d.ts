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

export declare type GetWalletBalanceInput = {
  index: number;
  symbol: string;
  address: string;
  contractAddress: string;
  network: string;
  contractAbi: string;
};

export declare type GetWalletBalanceOutput = {
  balance: number;
};

export declare type GetWalletBalanceBySymbolInput = {
  symbol: string;
  address: string;
  contractAddress: string;
  network: string;
  contractAbi: string;
};

export declare type GetWalletBalanceBySymbolOutput = {
  balance: number;
};

export declare type GetWalletBalanceByAddressInput = {
  address: string;
  contractAddress: string;
  network: string;
  contractAbi: string;
};

export declare type GetWalletBalanceByAddressOutput = {
  balance: number;
};

export declare type GetWalletBalanceByContractInput = {
  contractAddress: string;
  network: string;
  contractAbi: string;
};

export declare type GetWalletBalanceByContractOutput = {
  balance: number;
};

export declare type GetWalletBalanceBySymbolAndAddressInput = {
  symbol: string;
  address: string;
  contractAddress: string;
  network: string;
  contractAbi: string;
};

export declare type GetWalletBalanceBySymbolAndAddressOutput = {
  balance: number;
};

export declare type GetWalletBalanceBySymbolAndContractInput = {
  symbol: string;
};
