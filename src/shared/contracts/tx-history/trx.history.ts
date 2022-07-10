import { config } from 'dotenv';
import axios from 'axios';
import { TxHistory } from './types';
import { TransactionType } from 'enums/tx-type.enum';
import { TransactionStatus } from 'enums/transaction-status.enum';
config();

/**
 * Get TRX Transaction history
 * @param {string} address
 * @returns {TxHistory[]} transaction history
 */
export async function trxTxHistoryByBlock(address: string): Promise<TxHistory[]> {
  try {
    const { data } = await axios.get(
      `https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=15&start=0&address=${address}`,
    );
    return data?.data
      .filter((tx) => tx?.contractType === 1)
      .map((tx) => {
        return {
          hash: tx?.hash,
          amount: tx?.amount / 1000000,
          sourceAddress: tx?.ownerAddress,
          receiverAddress: tx?.toAddress,
          type: tx?.toAddress === address ? TransactionType.RECEIVED : TransactionType.SENT,
          fee: +tx?.cost?.fee / 1000000,
          date: tx?.timestamp,
          status: tx?.confirmed
            ? TransactionStatus.CONFIRMED
            : !tx.confirmed && !tx.revert
            ? TransactionStatus.PENDING
            : TransactionStatus.FAILED,
        };
      });
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}

/**
 * Get TRX Token transaction history
 * @param {string} address
 * @param {string} contractAddress
 * @returns {TxHistory[]} transaction history
 */
export async function trxTokenTxHistoryByBlock(
  address: string,
  contractAddress: string,
): Promise<TxHistory[]> {
  try {
    const { data } = await axios.get(
      `https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=15&start=0&address=${address}`,
    );
    return data?.data
      .filter((tx) => tx?.contractData?.contract_address === contractAddress)
      .map((tx) => {
        return {
          hash: tx?.hash,
          amount: tx?.trigger_info?.parameter?._value / 1000000,
          sourceAddress: tx?.contractData?.owner_address,
          receiverAddress: tx?.trigger_info?.parameter?._to,
          type:
            tx?.trigger_info?.parameter?._to === address
              ? TransactionType.RECEIVED
              : TransactionType.SENT,
          fee: +tx?.cost?.fee / 1000000,
        };
      });
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}
