import * as xrpl from 'xrpl';
import { TxHistory } from './types';

/**
 * Get XRP Transaction history
 * @param {xrpl.Wallet} wallet
 * @returns {any} transaction fee
 */
export async function xrpTxHistoryByBlock(wallet: xrpl.Wallet): Promise<TxHistory[]> {
  const network = +process.env.IS_TESTNET === 1 ? process.env.XRP_TESTNET : process.env.XRP_MAINNET;
  try {
    const client = new xrpl.Client(network);
    await client.connect();
    const data = await client.request({
      command: 'account_tx',
      account: wallet.address,
    });

    return data?.result?.transactions.map((tx) => {
      return {
        //@ts-ignore
        hash: tx?.tx?.hash,
        //@ts-ignore
        amount: tx?.tx?.Amount / 1000,
        //@ts-ignore
        sourceAddress: tx?.tx?.Account,
        //@ts-ignore
        receiverAddress: tx?.tx?.Destination,
        //@ts-ignore
        type: tx?.tx?.Destination === wallet.address ? 'RECEIVED' : 'SENT',
        fee: +tx?.tx?.Fee
      };
    });
  } catch (error) {
    console.log({ newError: error });
    throw new Error(error);
  }
}
