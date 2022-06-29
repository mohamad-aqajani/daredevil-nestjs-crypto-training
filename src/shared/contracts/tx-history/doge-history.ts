import axios from 'axios';
import { TxHistory } from './types';

export async function dogeTxReceivedHistory(address: string): Promise<Array<TxHistory>> {
  try {
    const network = process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
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
        };
      }),
    );
    return dataSwap;
  } catch (error) {
    throw new Error(error);
  }
}

export async function dogeTxSpentHistory(address: string): Promise<Array<TxHistory>> {
  try {
    const network = process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
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
        };
      }),
    );
    return dataSwap;
  } catch (error) {
    throw new Error(error);
  }
}

export async function dogeTxHistory(address: string) {
  return [...(await dogeTxReceivedHistory(address)), ...(await dogeTxSpentHistory(address))];
}
