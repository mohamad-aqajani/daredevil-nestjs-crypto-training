import { TransactionInput } from '.';
import { sendBitcoin } from '../transactions/btc-transaction';
import { sendDoge } from '../transactions/doge-transaction';
import { sendETH } from '../transactions/eth-transaction';
import { sendTRX } from '../transactions/trx-transaction';
import { xrpTransaction } from '../transactions/xrp-transaction';
import { XrpWallet } from '../wallets';
import { getUserWallet } from './get-wallet.util';

/**
 * Create, Sign and Boardcast a transaction
 * @param {number} userId
 * @param {Asset} asset
 * @param {string} receiverAddress
 * @param {string} sourceAddress
 * @param {number} amount
 * @param {number} gas?
 * @returns {WalletInfo} wallet Info
 */
export async function transactOnLedger(params: TransactionInput): Promise<string> {
  const { sourceAddress, receiverAddress, gas, amount, userId, asset } = params;
  const wallet = await getUserWallet(userId, asset);
  switch (asset?.symbol) {
    case 'BTC':
      return await sendBitcoin(receiverAddress, amount, sourceAddress, wallet.privateKey);
    case 'ETH':
      return await sendETH(
        receiverAddress,
        sourceAddress,
        amount,
        undefined,
        undefined,
        wallet?.privateKey,
      );

    case 'DOGE':
      return await sendDoge(receiverAddress, amount, sourceAddress, wallet.privateKey);
    case 'TRX':
      return await sendTRX(sourceAddress, receiverAddress, amount, wallet.privateKey);
    case 'XRP': {
      const wallet = await XrpWallet(userId);
      return await xrpTransaction(wallet, receiverAddress, amount);
    }

    default: {
      switch (asset.network) {
        case 'ETH':
          return await sendETH(
            receiverAddress,
            sourceAddress,
            amount,
            asset.contractAbi,
            asset.contractAddress,
            wallet.privateKey,
          );
        case 'TRX':
          return await sendTRX(
            sourceAddress,
            receiverAddress,
            amount,
            wallet.privateKey,
            asset.contractAddress,
          );
      }
    }
  }
}
