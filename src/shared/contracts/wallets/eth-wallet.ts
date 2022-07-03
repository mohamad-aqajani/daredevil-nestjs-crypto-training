import bip32 from 'bip32';
import bip39 from 'bip39';
import Web3 from 'web3';
import { Wallet } from './types';

const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider (+process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),

);

export async function EthWallet(mnemonic, index): Promise<Wallet> {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const node = await bip32.fromSeed(seed);
  const child = await node.derivePath(
    +process.env.IS_TESTNET ? `m/44'/1'/${index}'/0/0` : `m/44'/60'/${index}'/0/0`,
  );
  const privateKey = await child.privateKey.toString('hex');
  const address = web3.eth.accounts.privateKeyToAccount(privateKey).address || '';
  return {
    privateKey,
    address,
  };
}
