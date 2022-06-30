import { AssetTransfersCategory, createAlchemyWeb3 } from '@alch/alchemy-web3';
import { TxHistory } from './types';
import { config } from 'dotenv';
config();

const alchemyApiKey = process.env.IS_TESTNET
  ? process.env.ALCHEMY_RINKEBY_API_KEY
  : process.env.ALCHEMY_API_KEY;
const alchemyUrl = process.env.IS_TESTNET
  ? process.env.ALCHEMY_RINKEBY_URL
  : process.env.ALCHEMY_MAINNET_URL;

const alchemyWeb3 = createAlchemyWeb3(`${alchemyUrl}${alchemyApiKey}`);

export async function ethTxHistoryByBlock(
  address: string,
  fromBlock = '0x0',
): Promise<TxHistory[]> {
  try {
    const received = await alchemyWeb3.alchemy.getAssetTransfers({
      fromBlock,
      toAddress: address,
      category: [
        process.env.IS_TESTNET
          ? AssetTransfersCategory.SPECIALNFT
          : AssetTransfersCategory.EXTERNAL,
      ],
    });
    const sent = await alchemyWeb3.alchemy.getAssetTransfers({
      fromBlock,
      fromAddress: address,
      category: [
        process.env.IS_TESTNET
          ? AssetTransfersCategory.SPECIALNFT
          : AssetTransfersCategory.EXTERNAL,
      ],
    });

    const sentArray: TxHistory[] = sent.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer.from,
        receiverAddress: transfer.to,
        type: 'SENT',
      };
    });

    const receivedArray: TxHistory[] = received.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer?.from,
        receiverAddress: transfer?.to,
        type: 'RECEIVED',
      };
    });

    return sentArray.concat(receivedArray);
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}

export async function ethTokenTxHistoryByBlock(
  address: string,
  contractAddress: string,
  fromBlock = '0x0',
): Promise<TxHistory[]> {
  try {
    const received = await alchemyWeb3.alchemy.getAssetTransfers({
      fromBlock,
      toAddress: address,
      contractAddresses: [contractAddress],
      category: [AssetTransfersCategory.TOKEN],
    });
    const sent = await alchemyWeb3.alchemy.getAssetTransfers({
      fromBlock,
      fromAddress: address,
      contractAddresses: [contractAddress],
      category: [AssetTransfersCategory.TOKEN],
    });

    const sentArray: TxHistory[] = sent.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer?.from,
        receiverAddress: transfer?.to,
        type: 'SENT',
      };
    });

    const receivedArray: TxHistory[] = received.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer?.from,
        receiverAddress: transfer?.to,
        type: 'RECEIVED',
      };
    });

    return sentArray.concat(receivedArray);
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}
