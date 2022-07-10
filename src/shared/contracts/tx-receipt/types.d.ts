import BigNumber from "bignumber.js";
import { TransactionStatus } from "enums/transaction-status.enum";

export declare type TxReceipt = {
    from: string;
    to: string;
    date?: string;
    fee: string | number;
    value: string | number ;
    status: TransactionStatus;
    hash: string;
}