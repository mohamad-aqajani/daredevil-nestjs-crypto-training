import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import { Wallet } from './types';
import * as BitCoin from 'bitcoinjs-lib';
import * as coininfo from 'coininfo';

export async function DogeWallet(mnemonic, index): Promise<Wallet> {
  const doge = process.env.IS_TESTNET ? coininfo.dogecoin.test : coininfo.dogecoin.main;
  const dogeNetwork = doge.toBitcoinJS();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const node = await bip32.fromSeed(seed);
  const child = await node.derivePath("m/44'/3'/0'/0").derive(index);
  const address = BitCoin.payments.p2pkh({
    network: dogeNetwork,
    pubkey: child.publicKey,
  }).address;
  return {
    privateKey: child.toWIF(),
    address,
  };
}
