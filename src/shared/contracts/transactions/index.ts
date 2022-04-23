import { TransactionInput, TransactionOutput, TransactionPreviewInput, TransactionPreviewOutput } from './types';

export async function TransactionPreview({}: TransactionPreviewInput): Promise<TransactionPreviewOutput> {
  return {
    from: '',
    to: '',
    amount: 0,
    fee: 0,
  };
}

// export async function Transaction({
//   privateKey,
//   wallet,
//   sourceAddress,
//   receiverAddress,
//   amount,
//   network,
//   fee,
//   contractAddress,
//   contractAbi,
// }: TransactionInput): Promise<TransactionOutput> {
//     let tx_hash: string;
//     switch (network) {
//         case 'BTC':
//             tx_hash = await createBtcTransaction({}
//     }
// }
