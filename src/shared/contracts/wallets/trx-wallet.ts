import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import TronWeb from 'tronweb';
import { Wallet } from './types';

export async function TrxWallet(mnemonic, index): Promise<Wallet> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const node = await bip32.fromSeed(seed);
    const child = await node.derivePath(`m/44'/195'/${index}'/0/0`);
    const privateKey = await child.privateKey.toString("hex");
    const address = await TronWeb.address.fromPrivateKey(privateKey);
    return {
      privateKey,
      address,
    };
  }