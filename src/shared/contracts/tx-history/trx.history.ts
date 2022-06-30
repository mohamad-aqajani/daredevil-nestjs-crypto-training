import TronWeb from 'tronweb';
import TronGrid from 'tronGrid';
import { config } from 'dotenv';
import axios from 'axios';
import { TxHistory } from './types';
config();

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(
  !process.env.IS_TESTNET ? process.env.TRX_TEST_BLOCK : process.env.TRX_BLOCK,
);
const solidityNode = new HttpProvider(
  !process.env.IS_TESTNET ? process.env.TRX_TEST_SOLIDITY_NODE : process.env.TRX_SOLIDITY_NODE,
);
const eventServer = new HttpProvider(
  !process.env.IS_TESTNET ? process.env.TRX_TEST_SERVER_EVENT : process.env.TRX_SERVER_EVENT,
);

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
const tronGrid = new TronGrid(tronWeb);

/**
 * Get TRX Transaction history
 * @param {string} address
 * @returns {TxHistory[]} transaction history
 */
export async function trxTxHistoryByBlock(address: string): Promise<TxHistory[]> {
  try {
    const { data } = await axios.get(
      `https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=20&start=0&address=${address}`,
    );
    return data?.data
      .filter((tx) => tx?.contractType === 1)
      .map((tx) => {
        return {
          hash: tx?.hash,
          amount: tx?.amount / 1000000,
          sourceAddress: tx?.ownerAddress,
          receiverAddress: tx?.toAddress,
          type: tx?.toAddress === address ? 'RECEIVED' : 'SENT',
        };
      });
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}

/**
 * Get TRX Token transaction history
 * @param {string} address
 * @param {string} contractAddress
 * @returns {TxHistory[]} transaction history
 */
export async function trxTokenTxHistoryByBlock(
  address: string,
  contractAddress: string,
): Promise<TxHistory[]> {
  try {
    const { data } = await axios.get(
      `https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=20&start=0&address=${address}`,
    );
    return data?.data
      .filter((tx) => tx?.contractData?.contract_address === contractAddress)
      .map((tx) => {
        return {
          hash: tx?.hash,
          amount: tx?.trigger_info?.parameter?._value / 1000000,
          sourceAddress: tx?.contractData?.owner_address,
          receiverAddress: tx?.trigger_info?.parameter?._to,
          type: tx?.trigger_info?.parameter?._to === address ? 'RECEIVED' : 'SENT',
        };
      });
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error);
  }
}
