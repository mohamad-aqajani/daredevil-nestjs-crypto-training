export declare type SignedTransaction = {
  messageHash?: string;
  r: string;
  s: string;
  v: string;
  rawTransaction?: string;
  transactionHash?: string;
};

export declare type Xrptransaction = {
  TransactionType: 'Payment';
  Account: string;
  Amount: string;
  Destination: string;
};

//==========================TRANSACTION TYPES====================================
import * as xrpl from 'xrpl';

export declare type Network = 'BTC' | 'DOGE' | 'TRX' | 'ETH' | 'XRP';
export declare type TransactionInput = {
  privateKey?: string;
  wallet?: xrpl.Wallet | any;
  sourceAddress?: string;
  receiverAddress: string;
  amount: number | string;
  network: Network;
  fee?: number | string;
  contractAddress?: string;
  contractAbi?: any;
};

export declare type TransactionOutput = { txID: string; network: Network };
export declare type TransactionError = { message: string; network: Network };

export declare type TransactionPreviewInput = {
  from: string;
  to: string;
  amount: number;
};

export declare type TransactionPreviewOutput = {
  from: string;
  to: string;
  amount: number;
  fee: number;
};
