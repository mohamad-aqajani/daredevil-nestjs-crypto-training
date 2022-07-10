import { ApiProperty } from "@nestjs/swagger";
import { TransactionStatus } from "enums/transaction-status.enum";
import { TransactionType } from "enums/tx-type.enum";

export class TransactionHistoryRequest {
  assetId: number;
}

export class TransactionHistoryResponse {
  hash: string;
  amount: number;
  receiverAddress: string;
  sourceAddress: string;
  // @ApiProperty({enum: TransactionType})
  type: TransactionType;
  fee?: number;
  date?: number;
  status?:  TransactionStatus;
  ledgerIndex?: string;
}
