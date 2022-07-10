import BigNumber from 'bignumber.js';
import { config } from 'dotenv';
import { TransactionStatus } from 'enums/transaction-status.enum';
import * as txDecoder from 'ethereum-tx-decoder';
import Web3 from 'web3';
import { tetherEthAbi } from '../constants/contractAbi/eth/eth.tether';
import { TxReceipt } from './types';
config();

const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider(+process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
);

export async function ethTxReceipt(hash: string): Promise<TxReceipt> {
  try {
    const [receipt, details] = await Promise.all([
      await web3.eth.getTransactionReceipt(hash),
      await web3.eth.getTransaction(hash),
    ]);

    const block = await web3.eth.getBlock(details?.blockNumber);

    return {
      fee: (details.gas * +details.gasPrice) / 1000000000000000000,
      from: details.from,
      to: details.to,
      date: block?.timestamp.toString() as string,
      value: +details.value / 1000000000000000000,
      hash,
      status: receipt?.status
        ? TransactionStatus.CONFIRMED
        : !block?.timestamp
        ? TransactionStatus.FAILED
        : TransactionStatus.PENDING,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}

export async function ethTokenTxReceipt(
  hash: string,
  contractDecimals: number,
  abi: any,
  contractAddress?: string,
): Promise<TxReceipt> {
  try {
    var fnDecoder = new txDecoder.FunctionDecoder(JSON.parse(tetherEthAbi));
    const [details, receipt] = await Promise.all([
      web3.eth.getTransaction(hash),
      web3.eth.getTransactionReceipt(hash),
    ]);
    const input = fnDecoder.decodeFn(details.input);
    const block = await web3.eth.getBlock(details?.blockNumber);
    return {
      fee: (details.gas * +details.gasPrice) / 1000000000000000000,
      from: details.from,
      to: input._to,
      date: block?.timestamp.toString() as string,
      value: (new BigNumber(web3.utils.hexToNumberString(input?._value))).toNumber() / (new BigNumber(Math.pow(10, contractDecimals))).toNumber(),
      hash,
      status: receipt?.status
        ? TransactionStatus.CONFIRMED
        : !block?.timestamp
        ? TransactionStatus.FAILED
        : TransactionStatus.PENDING,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}
