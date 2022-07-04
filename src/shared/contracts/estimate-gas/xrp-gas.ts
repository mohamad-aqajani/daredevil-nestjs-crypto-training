import * as xrpl from 'xrpl';

/**
 * Estimate XRP network fee
 * @param {xrpl.Wallet} wallet
 * @param {string} receiverAddress
 * @param {number | string} amount
 * @returns {any} transaction fee
 */
export async function xrpGas(
  wallet: xrpl.Wallet,
  receiverAddress: string,
  amount: number,
): Promise<number> {
  const network = +process.env.IS_TESTNET === 1 ? process.env.XRP_TESTNET : process.env.XRP_MAINNET;
  try {
    const client = new xrpl.Client(network);
    await client.connect();

    const prepared = await client.autofill({
      TransactionType: 'Payment',
      Account: wallet.address,
      Amount: xrpl.xrpToDrops(amount.toString()),
      Destination: receiverAddress,
    });

    //@ts-ignore
    return await +prepared?.Fee;
  } catch (error) {
    console.log({ newError: error });
  }
}
