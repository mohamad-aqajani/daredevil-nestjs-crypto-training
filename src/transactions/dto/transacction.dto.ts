export class TransactionRequest {
  amount: number;
  receiverAddress: string;
  assetId: number;
  gas?: number;
}

export class TransactionResponse {
  hash: string;
  coin: string;
  amount: number;
  receiverAddress: string;
  sourceAddress: string;
}
