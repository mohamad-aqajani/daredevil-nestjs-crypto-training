import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TransactionRequest {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  receiverAddress: string;

  @IsNotEmpty()
  @IsNumber()
  assetId: number;

  @IsOptional()
  gas?: number;
}

export class TransactionResponse {
  hash: string;
  coin: string;
  amount: number;
  receiverAddress: string;
  sourceAddress: string;
}
