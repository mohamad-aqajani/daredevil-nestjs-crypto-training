import { TxReceiptInput } from '.';
import { btcTXReceipt } from '../tx-receipt/btc-receipt';
import { dogeTXReceipt } from '../tx-receipt/doge-receipt';
import { ethTokenTxReceipt, ethTxReceipt } from '../tx-receipt/eth-receipt';
import { TrxTokenTxReceipt, TrxTxReceipt } from '../tx-receipt/trx-receipt';
import { TxReceipt } from '../tx-receipt/types';
import { xrpTxReceipt } from '../tx-receipt/xrp-receipt';

/**
 * get transaction receipt
 * @param {
 * hash: string;
 * contractAbi?: any;
 * contractDecimal?: number;
 * contractAddress?: string;
 *  ledger?: string | number;
 *  asset: Asset;
 * } args
 * @returns {Object} receipt
 */
export async function getTxReceipt(args: TxReceiptInput): Promise<TxReceipt> {
  const { hash, asset, ledger } = args;
  switch (asset.symbol) {
    case 'BTC':
      return await btcTXReceipt(hash);

    case 'ETH':
      return await ethTxReceipt(hash);

    case 'DOGE':
      return await dogeTXReceipt(hash);
    case 'TRX':
      return await TrxTxReceipt(hash);
    case 'XRP':
      return await xrpTxReceipt(hash, ledger as number);

    default: {
      switch (asset.network) {
        case 'ETH':
          return await ethTokenTxReceipt(hash, asset.decimals, asset.contractAbi);
        case 'TRX':
          return await TrxTokenTxReceipt(hash, asset.decimals);
      }
    }
  }
}
