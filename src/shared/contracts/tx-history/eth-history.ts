import { AssetTransfersCategory, createAlchemyWeb3 } from '@alch/alchemy-web3';
import { TxHistory } from './types';
import { config } from 'dotenv';
config();

const alchemyApiKey = !process.env.IS_TESTNET
  ? process.env.ALCHEMY_RINKEBY_API_KEY
  : process.env.ALCHEMY_API_KEY;
const alchemyUrl = !process.env.IS_TESTNET
  ? process.env.ALCHEMY_RINKEBY_URL
  : process.env.ALCHEMY_MAINNET_URL;

  const alchemyWeb3 = createAlchemyWeb3(`${alchemyUrl}${alchemyApiKey}`);

export async function ethTxHistoryByBlock(address: string): Promise<TxHistory[]> {
  try {
    const received = await alchemyWeb3.alchemy.getAssetTransfers({
      fromBlock: '0x0',
      toAddress: address,
      category: [!process.env.IS_TESTNET ? AssetTransfersCategory.SPECIALNFT: AssetTransfersCategory.TOKEN],
    });
    console.log({received: received.transfers[0].rawContract})
    const sent = await alchemyWeb3.alchemy.getAssetTransfers({
      fromBlock: '0x0',
      fromAddress: address,
      category: [!process.env.IS_TESTNET ? AssetTransfersCategory.SPECIALNFT: AssetTransfersCategory.EXTERNAL],
    });

    const sentArray: TxHistory[] = sent.transfers.map((transfer) => {
      return {
        amount: +transfer.value.toFixed(4),
        hash: transfer.hash,
        sourceAddress: transfer.from,
        receiverAddress: transfer.to,
        type: 'SENT',
      };
    });

    const receivedArray: TxHistory[] = received.transfers.map((transfer) => {
      return {
        amount: +transfer.value.toFixed(4),
        hash: transfer.hash,
        sourceAddress: transfer.from,
        receiverAddress: transfer.to,
        type: 'RECEIVED',
      };
    });

    return sentArray.concat(receivedArray);
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}
