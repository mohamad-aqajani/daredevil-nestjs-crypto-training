import { NetworkType } from 'enums/network.enum';
import { btcTxFee, dogeTXFee, ethTxFee } from '../fee-history';

/**
 * calculate network fee
 * @param {SymbolWalletType} symbol
 * @param {NetworkType} network
 * @param {number} amount
 * @param {SymbolWalletType} receiverAddress
 * @param {string} sourceAddress
 * @param {string} contractAbi
 * @param {string} contractAddress
 * @param {number} userId
 * @returns {number} balance
 */
export async function getFeeHistory(hash: string, network: NetworkType): Promise<number> {
  switch (network) {
    case 'BTC':
      return await btcTxFee(hash);

    case 'ETH':
      return await ethTxFee(hash);

    case 'DOGE':
      return await dogeTXFee(hash);

    default:
      return 0;
  }
}
