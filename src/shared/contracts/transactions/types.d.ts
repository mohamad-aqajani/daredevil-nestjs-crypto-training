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
