import axios from 'axios';
import { TransactionStatus } from 'enums/transaction-status.enum';
import { TransactionType } from 'enums/tx-type.enum';
import { TxHistory } from './types';

/**
 * Get BTC Transaction history
 * @param {string} address
 * @returns {TxHistory[]} transaction history
 */
export async function btcTxReceivedHistory(address: string): Promise<Array<TxHistory>> {
  try {
    const network = +process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
    const {
      data: { data },
    } = await axios.get(`${process.env.BTC_BLOCK}get_tx_received/${network}/${address}`);
    const dataSwap = await Promise.all(
      data?.txs.map(async (tx) => {
        const txData = await axios.get(
          `${process.env.BTC_BLOCK}get_tx_inputs/${network}/${tx?.txid}`,
        );

        return {
          amount: +tx?.value,
          hash: tx?.txid,
          sourceAddress: txData?.data?.data?.inputs[0]?.address,
          receiverAddress: address,
          type: TransactionType.RECEIVED,
          date: tx?.time,
          status: tx?.confirmations > 0 ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
        };
      }),
    );

    return dataSwap;
  } catch (error) {
    throw new Error(error);
  }
}

export async function btcTxSpentHistory(address: string): Promise<Array<TxHistory>> {
  try {
    const network = +process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
    const {
      data: { data },
    } = await axios.get(`${process.env.BTC_BLOCK}get_tx_spent/${network}/${address}`);
    const dataSwap = await Promise.all(
      data?.txs.map(async (tx) => {
        const txData = await axios.get(
          `${process.env.BTC_BLOCK}get_tx_outputs/${network}/${tx?.txid}`,
        );

        return {
          amount: +tx?.value,
          hash: tx?.txid,
          sourceAddress: address,
          receiverAddress: txData?.data?.data?.outputs[0]?.address,
          type: TransactionType.SENT,
          date: tx?.time,
          status: tx?.confirmations > 0 ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
        };
      }),
    );

    return dataSwap;
  } catch (error) {
    throw new Error(error);
  }
}

export async function btcTxHistory(address: string): Promise<Array<TxHistory>> {
  return await Promise.all([
    ...(await btcTxReceivedHistory(address)),
    ...(await btcTxSpentHistory(address)),
  ]);
}
