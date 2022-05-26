import { Wallet } from './types';
import * as xrpl from 'xrpl';

export async function XrpWallet(mnemonic, index): Promise<xrpl.Wallet> {
  const wallet = xrpl.Wallet.fromMnemonic(mnemonic, { derivationPath: `m/44'/144'/${index}'/0/0` });
  return wallet;
}
