import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import { Wallet } from './types';
import * as BitCoin from 'bitcoinjs-lib';

export async function BtcWallet(mnemonic, index): Promise<Wallet> {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const node = await bip32.fromSeed(seed);
  const child = await node.derivePath(
    process.env.IS_TESTNET ? "m/44'/1'/0'/0" :"m/44'/0'/0'/0",
  ).derive(index);
  const address = BitCoin.payments.p2pkh({
    network: process.env.IS_TESTNET ? BitCoin.networks.testnet : BitCoin.networks.bitcoin,
    pubkey: child.publicKey,
  }).address;
  return {
    privateKey: child.toWIF(),
    address,
  };
}
