import { NetworkType } from 'enums/network.enum';
import { btcBalance } from '../balance/btc-balance';
import { dogeBalance } from '../balance/doge-balance';
import { ethBalance, ethContractBalance } from '../balance/eth-balance';
import { trxBalance, trxContractBalance } from '../balance/trx-balance';
import { xrpBalance } from '../balance/xrp-balance';
import { SymbolWalletType } from '../wallets/types';

/**
 * Get wallets balance
 * @param {number} index
 * @param {SymbolWalletType} symbol
 * @param {string} address
 * @param {string} contractAddress?
 * @param {NetworkType} network?
 * @param {any} contractAbi?
 * @returns {number} balance
 */
export async function getWalletBalance(
  index: number,
  symbol: SymbolWalletType,
  address: string,
  contractAddress?: string,
  network?: NetworkType,
  contractAbi?: any,
): Promise<number> {
  switch (symbol) {
    case 'BTC':
      return await btcBalance(address);
    case 'ETH':
      return await ethBalance(address);

    case 'TRX':
      return await trxBalance(address);

    case 'XRP':
      return await xrpBalance(address);
    case 'DOGE':
      return await dogeBalance(address);
    default: {
      switch (network) {
        case 'ETH':
          return await ethContractBalance(address, contractAddress, contractAbi);
        case 'TRX':
          return await trxContractBalance(address, contractAddress, contractAbi);
      }
    }
  }
}
