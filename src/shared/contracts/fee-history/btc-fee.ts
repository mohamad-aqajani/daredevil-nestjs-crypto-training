import axios from 'axios';

/**
 * Get BTC Transaction fee by hash
 * @param {string} address
 * @returns {TxHistory[]} transaction history
 */
export async function btcTxFee(hash: string): Promise<number> {
  try {
    const network = +process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
    const { data } = await axios.get(`${process.env.BTC_BLOCK}tx/${network}/${hash}`);
    return data?.data?.fee;
  } catch (error) {
    throw new Error(error);
  }
}
