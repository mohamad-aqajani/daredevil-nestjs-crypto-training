import axios from 'axios';

/**
 * Get DOGE balance
 * @param {string} address
 * @returns {number} balance
 */
export async function dogeBalance(address: string): Promise<number> {
  const network = process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
  try {
    const { data } = await axios.get(
      `${process.env.BTC_BLOCK}get_address_balance/${network}/${address}`,
    );
    return +(+data?.data?.confirmed_balance).toFixed(7); 
  } catch (error) {
    console.log({error});
  }
}
