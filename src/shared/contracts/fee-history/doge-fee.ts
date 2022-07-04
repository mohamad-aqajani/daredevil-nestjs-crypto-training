import axios from 'axios';
export async function dogeTXFee(hash: string): Promise<number> {
  try {
    const network = +process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
    const { data } = await axios.get(`${process.env.BTC_BLOCK}tx/${network}/${hash}`);
    return data?.data?.fee;
  } catch (error) {
    throw new Error(error);
  }
}
