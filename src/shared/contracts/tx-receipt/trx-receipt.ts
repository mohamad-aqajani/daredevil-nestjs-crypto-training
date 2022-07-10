import axios from 'axios';
import { config } from 'dotenv';
import { TransactionStatus } from 'enums/transaction-status.enum';
import { TxReceipt } from './types';
config();

export async function TrxTxReceipt(hash: string): Promise<TxReceipt> {
  try {
    const { data } = await axios.get(
      `https://apilist.tronscan.org/api/transaction-info?hash=${hash}`,
    );
    return {
      hash,
      from: data?.ownerAddress,
      to: data?.toAddress,
      date: data?.timestamp,
      fee: data?.cost?.fee / 1000000,
      value: data?.contractData?.amount / 1000000,
      status: data?.confirmed
        ? TransactionStatus.CONFIRMED
        : data?.revert
        ? TransactionStatus.FAILED
        : TransactionStatus.PENDING,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}

export async function TrxTokenTxReceipt(
  hash: string,
  contractDecimals: number,
): Promise<TxReceipt> {
  console.log({...arguments})
  try {
    const { data } = await axios.get(
      `https://apilist.tronscan.org/api/transaction-info?hash=${hash}`,
    );

    return {
      to: data?.trigger_info?.parameter?._to || data?.tokenTransferInfo?.to_address,
      from: data?.ownerAddress,
      date: data?.timestamp,
      fee: data?.cost?.energy_fee / 1000000,
      hash,
      status: data?.confirmed
        ? TransactionStatus.CONFIRMED
        : data?.revert
        ? TransactionStatus.FAILED
        : TransactionStatus.PENDING,
      value:
        +data?.trigger_info?.parameter?._value / Math.pow(10, +contractDecimals) ||
        +data?.tokenTransferInfo?.amount_str / Math.pow(10, +contractDecimals),
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}
