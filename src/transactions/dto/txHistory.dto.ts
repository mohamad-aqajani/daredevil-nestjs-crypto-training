export class TransactionHistoryRequest {
  assetId: number;
}

export class TransactionHistoryResponse {
  hash: string;
  amount: number;
  receiverAddress: string;
  sourceAddress: string;
  type: 'SENT' | 'RECEIVED';
}
