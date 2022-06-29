export declare type TxHistory = {
  amount: number;
  hash: string;
  sourceAddress: string;
  receiverAddress: string;
  type: 'SENT' | 'RECEIVED';
};
