import axios from 'axios';
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
          type: 'RECEIVED',
          date: tx?.time,
          status: tx?.confirmations > 0 ? 'Confirmed' : 'Pending',
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
          type: 'SENT',
          date: tx?.time,
          status: tx?.confirmations > 0 ? 'Confirmed' : 'Pending',
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
    ...(await dogeTxReceivedHistory('D89RmwC4a14ietvuSHpftX7D1s89n4nSjG')),
    ...(await dogeTxSpentHistory('D89RmwC4a14ietvuSHpftX7D1s89n4nSjG')),
  ];
}
