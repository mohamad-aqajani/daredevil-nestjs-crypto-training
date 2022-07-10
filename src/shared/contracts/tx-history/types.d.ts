import { TransactionStatus } from "enums/transaction-status.enum";
import { TransactionType } from "enums/tx-type.enum";

export declare type TxHistory = {
  amount: number;
  hash: string;
  sourceAddress: string;
  receiverAddress: string;
  type: TransactionType;
  fee?: number;
  date?: number;
  status?: TransactionStatus;
  ledgerIndex?: string
};
