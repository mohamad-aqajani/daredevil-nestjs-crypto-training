import Web3 from 'web3';
import { config } from 'dotenv';
config();
const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider(+process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
);

export async function ethTxFee(hash: string): Promise<number> {
  try {
    const details = await web3.eth.getTransaction(hash);
    return (details.gas * +details.gasPrice) / 1000000000000000000;
  } catch (error) {
    throw new Error(error);
  }
}
