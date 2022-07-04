export declare type TxHistory = {
  amount: number;
  hash: string;
  sourceAddress: string;
  receiverAddress: string;
  type: 'SENT' | 'RECEIVED';
  fee?: any;
  date?: number | string;
  status?: 'Confirmed' | 'Pending' | 'Failed'
};
