import * as xrpl from 'xrpl';

/**
 * Get Ripple balance
 * @param {string} address
 * @returns {number} balance
 */
export async function xrpBalance(address: string): Promise<number> {
  const client = new xrpl.Client(
    process.env.IS_TESTNET ? process.env.XRP_TESTNET : process.env.XRP_MAINNET,
  );
  await client.connect();
  const response = await client.request({
    command: 'account_info',
    account: address,
    ledger_index: 'validated',
  });
  client.disconnect();
  return +response.result.account_data.Balance / 1000000;
}
