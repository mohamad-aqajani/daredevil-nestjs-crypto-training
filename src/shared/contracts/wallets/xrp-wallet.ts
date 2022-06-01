import { Wallet } from './types';
import * as xrpl from 'xrpl';
import { generateSeed } from 'xrpl-keypairs/dist';

export async function XrpWallet(index): Promise<xrpl.Wallet> {
  const secretArray: Array<number> = JSON.parse(process.env.XRPL_ENTROPY);
  const seed = generateSeed({
    entropy: new Uint8Array([...secretArray, index]),
    algorithm: 'ecdsa-secp256k1',
  });
  const wallet = xrpl.Wallet.fromSeed(seed);
  return wallet;
}
