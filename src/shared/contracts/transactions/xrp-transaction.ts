import * as xrpl from 'xrpl';
import { Payment } from 'xrpl';

/**
 * Create Ripple Transaction
 * @param {xrpl.Wallet} wallet
 * @param {string} receiverAddress
 * @param {number | string} amount
 * @returns {any} transaction object
 */
export async function createXrpTransaction(
  wallet: xrpl.Wallet,
  receiverAddress: string,
  amount: number,
): Promise<Payment> {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  /** prepare transaction */
  const prepared = await client.autofill({
    TransactionType: 'Payment',
    Account: wallet.address,
    Amount: xrpl.xrpToDrops(amount.toString()),
    Destination: receiverAddress,
  });

  client.disconnect();
  return prepared;
}

/**
 * Sign And Boardcast Ripple Transaction
 * @param {Payment} prepared
 * @param {xrpl.Wallet} wallet
 * @returns {string} transaction hash
 */
export async function signAndBoardCastXrpTransaction(
  prepared: Payment,
  wallet: xrpl.Wallet,
): Promise<string> {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();
  const signed = wallet.sign(prepared);
  const tx = await client.submitAndWait(signed.tx_blob);
  client.disconnect();
  if (tx.result.validated) return tx.result.hash;
  else return '';
}
