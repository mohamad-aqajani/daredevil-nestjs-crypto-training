import { AssetTransfersCategory, createAlchemyWeb3 } from '@alch/alchemy-web3';
import { TxHistory } from './types';
import Web3 from 'web3';
import { config } from 'dotenv';
import { TransactionType } from 'enums/tx-type.enum';
config();
const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider(+process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
);

const alchemyApiKey = +process.env.IS_TESTNET
  ? process.env.ALCHEMY_RINKEBY_API_KEY
  : process.env.ALCHEMY_API_KEY;
const alchemyUrl = +process.env.IS_TESTNET
  ? process.env.ALCHEMY_RINKEBY_URL
  : process.env.ALCHEMY_MAINNET_URL;

const alchemyWeb3 = createAlchemyWeb3(`${alchemyUrl}${alchemyApiKey}`);

/**
 * Get ETH Transaction history
 * @param {string} address
 * @param {string} fromBlock block number
 * @returns {TxHistory[]} transaction history
 */
export async function ethTxHistoryByBlock(
  address: string,
  fromBlock = '0x0',
): Promise<TxHistory[]> {
  try {
    const [received, sent] = await Promise.all([
      await alchemyWeb3.alchemy.getAssetTransfers({
        fromBlock,
        toAddress: address,
        excludeZeroValue: true,
        category: [
          +process.env.IS_TESTNET
            ? AssetTransfersCategory.SPECIALNFT
            : AssetTransfersCategory.EXTERNAL,
        ],
      }),
      await alchemyWeb3.alchemy.getAssetTransfers({
        fromBlock,
        fromAddress: address,
        excludeZeroValue: true,
        category: [
          +process.env.IS_TESTNET
            ? AssetTransfersCategory.SPECIALNFT
            : AssetTransfersCategory.EXTERNAL,
        ],
      }),
    ]);

    const sentArray: TxHistory[] = sent.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer.from,
        receiverAddress: transfer.to,
        type: TransactionType.SENT
      };
    });
    const receivedArray: TxHistory[] = received.transfers.map((transfer) => {
      console.log({ transfer });
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer?.from,
        receiverAddress: transfer?.to,
        type: TransactionType.RECEIVED,
      };
    });

    const last = sentArray.concat(receivedArray);

    // await Promise.all(
    //   last.map(async (x, i) => {
    //     const details = await web3.eth.getTransaction(x.hash);
    //     last[i].fee = (+details.gasPrice * details.gas) / 1000000000000000000;
    //   }),
    // );
    return last;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}

/**
 * Get ETH Token transaction history
 * @param {string} address
 * @param {string} contractAddress contract address
 * @param {string} fromBlock block number
 * @returns {TxHistory[]} transaction history
 */
export async function ethTokenTxHistoryByBlock(
  address: string,
  contractAddress: string,
  fromBlock = '0x0',
): Promise<TxHistory[]> {
  try {
    const [received, sent] = await Promise.all([
      await alchemyWeb3.alchemy.getAssetTransfers({
        fromBlock,
        toAddress: address,
        contractAddresses: [contractAddress],
        category: [AssetTransfersCategory.TOKEN],
        excludeZeroValue: true
      }),
      await alchemyWeb3.alchemy.getAssetTransfers({
        fromBlock,
        fromAddress: address,
        contractAddresses: [contractAddress],
        category: [AssetTransfersCategory.TOKEN],
        excludeZeroValue: true
      }),
    ]);

    const sentArray: TxHistory[] = sent.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer?.from,
        receiverAddress: transfer?.to,
        type:  TransactionType.SENT,
      };
    });

    const receivedArray: TxHistory[] = received.transfers.map((transfer) => {
      return {
        amount: +transfer?.value?.toFixed(4),
        hash: transfer?.hash,
        sourceAddress: transfer?.from,
        receiverAddress: transfer?.to,
        type: TransactionType.RECEIVED,
      };
    });

    const last = sentArray.concat(receivedArray);

    // await Promise.all(
    //   last.map(async (x, i) => {
    //     const details = await alchemyWeb3.eth.getTransaction(x.hash);
    //     last[i].fee = (+details.gasPrice * details.gas) / 1000000000000000000;
    //   }),
    // );

    return last;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}
