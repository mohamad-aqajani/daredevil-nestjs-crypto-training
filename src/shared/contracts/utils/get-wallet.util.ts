import { Asset } from '@shared/entities/asset-entity';
import { NetworkType } from 'enums/network.enum';
import { WalletInfo } from '.';
import { BtcWallet, DogeWallet, EthWallet, TrxWallet, XrpWallet } from '../wallets';
import { Wallet } from '../wallets/types';
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
  await Promise.all(
    assets.map(async (asset) => {
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
              asset,
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
              asset,
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
              asset,
            });
          }
          break;

        case 'XRP':
          {
            const wallet = await XrpWallet(index);
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
              asset,
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
              asset,
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
            asset,
          });
        }
      }
    }),
  );
  return wallets;
}

/**
 * Get user wallets info
 * @param {number} index
 * @param {Asset} asset
 * @returns {WalletInfo} wallet Info
 */
export async function getUserWallet(
  index: number,
  asset: Asset,
  //@ts-ignore
  mnemonic?: string = process.env.MNEMONIC,
): Promise<Wallet> {
  const wallets: WalletInfo[] = [];
  switch (asset?.symbol) {
    case 'BTC': {
      const wallet = await BtcWallet(mnemonic, index);
      return wallet;
    }

    case 'ETH': {
      const wallet = await EthWallet(mnemonic, index);
      return wallet;
    }

    case 'TRX': {
      const wallet = await TrxWallet(mnemonic, index);
      wallet.address;
    }

    case 'XRP': {
      const wallet = await XrpWallet(index);
      return wallet;
    }

    case 'DOGE': {
      const wallet = await DogeWallet(mnemonic, index);
      return wallet;
    }

    default: {
      const wallet =
        asset?.network === NetworkType.ETH
          ? await EthWallet(mnemonic, index)
          : await TrxWallet(mnemonic, index);

      return wallet;
    }
  }
}
