import { Asset } from '@shared/entities/asset-entity';
import { NetworkType } from 'enums/network.enum';
import { WalletInfo } from '.';
import {
  BtcWallet,
  DogeWallet,
  EthWallet,
  SymbolWalletType,
  TrxWallet,
  XrpWallet,
} from '../wallets';
import { getWalletBalance } from './get-balance.util';

/**
 * Get wallets info
 * @param {number} index
 * @param {Asset[]} assets
 * @returns {WalletInfo} wallet Info
 */
export async function getAllWallets(
  index: number,
  assets: Asset[],
  //@ts-ignore
  mnemonic?: string = process.env.MNEMONIC,
): Promise<WalletInfo[]> {
  const wallets: WalletInfo[] = [];
  //@ts-ignore
  for (const asset of assets) {
    switch (asset?.symbol) {
      case 'BTC':
        {
          const wallet = await BtcWallet(mnemonic, index);
          const balance = await getWalletBalance(
            index,
            asset.symbol,
            wallet?.address,
            asset?.contractAddress,
            asset?.network,
            asset?.contractAbi,
          );
          wallets.push({
            address: wallet.address,
            balance,
          });
        }
        break;

      case 'ETH':
        {
          const wallet = await EthWallet(mnemonic, index);
          const balance = await getWalletBalance(
            index,
            asset.symbol,
            wallet?.address,
            asset?.contractAddress,
            asset?.network,
            asset?.contractAbi,
          );
          wallets.push({
            address: wallet.address,
            balance,
          });
        }
        break;

      case 'TRX':
        {
          const wallet = await TrxWallet(mnemonic, index);
          const balance = await getWalletBalance(
            index,
            asset.symbol,
            wallet?.address,
            asset?.contractAddress,
            asset?.network,
            asset?.contractAbi,
          );
          wallets.push({
            address: wallet.address,
            balance,
          });
        }
        break;

      case 'XRP':
        {
          const wallet = await XrpWallet(mnemonic, index);
          const balance = await getWalletBalance(
            index,
            asset.symbol,
            wallet?.classicAddress,
            asset?.contractAddress,
            asset?.network,
            asset?.contractAbi,
          );
          wallets.push({
            address: wallet.address,
            balance,
          });
        }
        break;

      case 'DOGE':
        {
          const wallet = await DogeWallet(mnemonic, index);
          const balance = await getWalletBalance(
            index,
            asset.symbol,
            wallet?.address,
            asset?.contractAddress,
            asset?.network,
            asset?.contractAbi,
          );
          wallets.push({
            address: wallet.address,
            balance,
          });
        }
        break;

      default: {
        const wallet =
          asset?.network === NetworkType.ETH
            ? await EthWallet(mnemonic, index)
            : await TrxWallet(mnemonic, index);
        const balance = await getWalletBalance(
          index,
          asset.symbol,
          wallet?.address,
          asset?.contractAddress,
          asset?.network,
          asset?.contractAbi,
        );
        wallets.push({
          address: wallet.address,
          balance,
        });
      }
    }
  }
  return wallets;
}
