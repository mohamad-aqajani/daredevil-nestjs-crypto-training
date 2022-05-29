import * as xrpl from 'xrpl';

/**
 * Create Ripple Transaction
 * @param {xrpl.Wallet} wallet
 * @param {string} receiverAddress
 * @param {number | string} amount
 * @returns {any} transaction object
 */
export async function xrpTransaction(
  wallet: xrpl.Wallet,
  receiverAddress: string,
  amount: number,
): Promise<string> {
  try {
    const network =
      +process.env.IS_TESTNET === 1 ? process.env.XRP_TESTNET : process.env.XRP_MAINNET;
    const client = new xrpl.Client(network);
    await client.connect();

    /** prepare transaction */
    const prepared = await client.autofill({
      TransactionType: 'Payment',
      Account: wallet.address,
      Amount: xrpl.xrpToDrops(amount.toString()),
      Destination: receiverAddress,
    });

    /** sign transaction */
    const signed = wallet.sign(prepared);
    const tx = await client.submitAndWait(signed.tx_blob);
    client.disconnect();
    if (tx.result.validated) return tx.result.hash;
    else return '';
  } catch (error) {
    throw new Error(error);
  }
}
