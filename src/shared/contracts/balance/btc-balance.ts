import axios from 'axios';

/**
 * Get BTC balance
 * @param {string} address
 * @returns {number} balance
 */
export async function btcBalance(address: string): Promise<number> {
  const network = +process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
  const { data } = await axios.get(
    `${process.env.BTC_BLOCK}get_address_balance/${network}/${address}`,
  );
  return +(+data?.data?.confirmed_balance).toFixed(7);
}
