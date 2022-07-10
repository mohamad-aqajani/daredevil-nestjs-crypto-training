import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { number } from "bitcoinjs-lib/src/script";
import { IsOptional } from "class-validator";
import { TransactionStatus } from "enums/transaction-status.enum";

export class TransactionReceiptResponse {
  from: string;
  to: string;
  date?: string;
  @ApiProperty({oneOf: [{type: 'number'}, {type: 'string'}]})
  fee: string | number;
  @ApiProperty({oneOf: [{type: 'number'}, {type: 'string'}]})
  value: string | number;
  @ApiProperty({type: 'string'})
  status: TransactionStatus;
  hash: string;
}

export class TransactionReceiptRequest {
  hash: string;
  assetId: number;

  @IsOptional()
  @ApiProperty({oneOf: [{type: 'number'}, {type: 'string'}]})
  ledger?: number | string;
}
