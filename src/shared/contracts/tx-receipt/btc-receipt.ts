import axios from 'axios';
import { TransactionStatus } from 'enums/transaction-status.enum';
import { TxReceipt } from './types';

export async function btcTXReceipt(hash: string): Promise<TxReceipt> {
  try {
    const network = +process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
    const { data } = await axios.get(`${process.env.BTC_BLOCK}tx/${network}/${hash}`);
    return {
      fee: data?.data?.fee,
      from: data?.data?.inputs?.[0]?.address,
      to: data?.data?.outputs?.[0]?.address,
      date: data?.data?.time,
      status:
        +data?.data?.confirmations > 0 ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
      value: +data?.data?.sent_value,
      hash,
    };
  } catch (error) {
    throw new Error(error);
  }
}
