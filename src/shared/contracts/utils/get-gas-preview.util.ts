import { NetworkType } from 'enums/network.enum';
import { GetGasInput } from '.';
import { btcGas, dogeGas, ethERC20Gas, ethGas, trxGas, xrpGas } from '../gas';
import { XrpWallet } from '../wallets';
import { SymbolWalletType } from '../wallets/types';

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
export async function getGasPrice(args: GetGasInput): Promise<number> {
  const {
    symbol,
    network,
    amount,
    receiverAddress,
    sourceAddress,
    contractAbi,
    contractAddress,
    userId,
  } = args;
  switch (symbol) {
    case 'BTC':
      return await btcGas(sourceAddress);

    case 'ETH':
      return await ethGas(sourceAddress, receiverAddress);

    case 'DOGE':
      return await dogeGas(sourceAddress);
    case 'TRX':
      return await trxGas(false);
    case 'XRP': {
      const wallet = await XrpWallet(userId);
      return await xrpGas(wallet, receiverAddress, amount);
    }

    default: {
      switch (network) {
        case 'ETH':
          return await ethERC20Gas(
            sourceAddress,
            receiverAddress,
            contractAddress,
            contractAbi,
            amount,
          );
        case 'TRX':
          return await trxGas(true);
      }
    }
  }
}
