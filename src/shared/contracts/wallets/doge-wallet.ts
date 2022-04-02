import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as BitcoreLibDoge from 'bitcore-lib-doge'
import { Wallet } from './types';

export async function DogeWallet(mnemonic, index): Promise<Wallet> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
  const node = await bip32.fromSeed(seed);
  const child = await node.derivePath(`m/44'/3'/${index}'/0/0`);
  const privateKey = await child.privateKey.toString("hex");
  const address = await new BitcoreLibDoge.PrivateKey(privateKey).toAddress().toString() || "";
  console.log({ address, privateKey });
  return {
    privateKey,
    address,
  };
  }