import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as BitcoreLib from 'bitcore-lib';
import { Wallet } from './types';

export async function BtcWallet(mnemonic, index): Promise<Wallet> {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const node = await bip32.fromSeed(seed);
  const child = await node.derivePath(
    process.env.IS_TESTNET ? `m/44'/1'/${index}'/0/0` : `m/44'/0'/${index}'/0/0`,
  );
  const privateKey = await child.privateKey.toString('hex');
  const address = (await new BitcoreLib.PrivateKey(privateKey).toAddress().toString()) || '';
  return {
    privateKey,
    address,
  };
}
