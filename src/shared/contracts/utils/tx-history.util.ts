import { TransferHistoryInput } from '.';
import {
  btcTxHistory,
  dogeTxHistory,
  ethTokenTxHistoryByBlock,
  ethTxHistoryByBlock,
  trxTokenTxHistoryByBlock,
  trxTxHistoryByBlock,
  xrpTxHistoryByBlock,
} from '../tx-history';
import { TxHistory } from '../tx-history/types';
import { XrpWallet } from '../wallets';
import { getUserWallet } from './get-wallet.util';

/**
 * Get Assets transaction histories
 * @param {number} userId
 * @param {Asset} asset
 * @param {string} sourceAddress
 * @param {string} contractAddress
 * @returns {TxHistory[]} wallet Info
 */
export async function transferHistory(params: TransferHistoryInput): Promise<TxHistory[]> {
  const { sourceAddress, userId, asset } = params;
  const wallet = await getUserWallet(userId, asset);
  switch (asset?.symbol) {
    case 'BTC':
      return await btcTxHistory(sourceAddress);
    case 'ETH':
      return await ethTxHistoryByBlock(sourceAddress);

    case 'DOGE':
      return await dogeTxHistory(sourceAddress);
    case 'TRX':
      return await trxTxHistoryByBlock(sourceAddress);
    case 'XRP': {
      const wallet = await XrpWallet(userId);
      return await xrpTxHistoryByBlock(wallet);
    }

    default: {
      switch (asset.network) {
        case 'ETH':
          return await ethTokenTxHistoryByBlock(sourceAddress, asset.contractAddress);
        case 'TRX':
          return await trxTokenTxHistoryByBlock(sourceAddress, asset.contractAddress);
      }
    }
  }
}
