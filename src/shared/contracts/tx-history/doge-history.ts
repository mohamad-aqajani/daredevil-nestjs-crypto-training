import axios from 'axios';
import { TransactionStatus } from 'enums/transaction-status.enum';
import { TransactionType } from 'enums/tx-type.enum';
import { TxHistory } from './types';

/**
 * Get DOGE Transaction history
 * @param {string} address
 * @returns {TxHistory[]} transaction history
 */
export async function dogeTxReceivedHistory(address: string): Promise<Array<TxHistory>> {
  try {
    const network = +process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
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
    // await Promise.all(
    //   dataSwap.map(async (tx, i) => {
    //     const txDetails = await axios.get(`${process.env.BTC_BLOCK}tx/${network}/${tx.hash}`);
    //     dataSwap[i].fee = +txDetails.data?.data?.fee;
    //   }),
    // );
    return dataSwap;
  } catch (error) {
    throw new Error(error);
  }
}

export async function dogeTxSpentHistory(address: string): Promise<Array<TxHistory>> {
  try {
    const network = +process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
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
    // await Promise.all(
    //   dataSwap.map(async (tx, i) => {
    //     const txDetails = await axios.get(`${process.env.BTC_BLOCK}tx/${network}/${tx.hash}`);
    //     dataSwap[i].fee = +txDetails.data?.data?.fee;
    //   }),
    // );

    return dataSwap;
  } catch (error) {
    throw new Error(error);
  }
}

export async function dogeTxHistory(address: string) {
  return [
    ...(await dogeTxReceivedHistory(address)),
    ...(await dogeTxSpentHistory(address)),
  ];
}
