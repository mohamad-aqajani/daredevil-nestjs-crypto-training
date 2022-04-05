import { Wallet } from './types';
import * as xrpl from 'xrpl';

export async function XrpWallet(mnemonic, index): Promise<Wallet> {
  const wallet = xrpl.Wallet.fromMnemonic(mnemonic, { derivationPath: `m/44'/144'/${index}'/0/0` });
  console.log({ wallet });
  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
}
