import * as xrpl from 'xrpl';

/**
 * Get Ripple balance
 * @param {string} address
 * @returns {number} balance
 */
export async function xrpBalance(address: string): Promise<number> {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();
  const response = await client.request({
    command: 'account_info',
    account: address,
    ledger_index: 'validated',
  });
  client.disconnect();
  return +response.result.account_data.Balance / 1000000;
}
