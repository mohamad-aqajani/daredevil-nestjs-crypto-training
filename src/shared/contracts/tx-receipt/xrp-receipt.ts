import { TransactionStatus } from 'enums/transaction-status.enum';
import * as xrpl from 'xrpl';
import { TxReceipt } from './types';

/**
 * Get XRP Transaction Receipt
 * @param {string} hash
 * @returns {any} transaction fee
 */
export async function xrpTxReceipt(hash: string, ledgerIndex: number): Promise<TxReceipt> {
  const network = +process.env.IS_TESTNET === 1 ? process.env.XRP_TESTNET : process.env.XRP_MAINNET;
  try {
    const client = new xrpl.Client(network);
    await client.connect();
    const data = await client.request({
      command: 'transaction_entry',
      tx_hash: hash,
      ledger_index: ledgerIndex,
    });
    // return data
    return {
      fee: +data?.result?.tx_json?.Fee / 1000000,
      //@ts-ignore
      value: +data?.result?.tx_json?.Amount / 1000000,
      status: data?.result?.metadata?.TransactionResult?.includes('SUCCESS')
        ? TransactionStatus.CONFIRMED
        : TransactionStatus.FAILED,

      from: data?.result?.tx_json?.Account,
      //@ts-ignore
      to: data?.result?.tx_json?.Destination,
      hash,
    };
  } catch (error) {
    console.log({ newError: error });
    throw new Error(error);
  }
}
