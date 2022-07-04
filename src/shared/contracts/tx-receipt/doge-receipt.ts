// import axios from 'axios';
// import { TxReceipt } from './types';
// console.log('ddd')
// export async function dogeTXReceipt(hash: string): Promise<TxReceipt> {
//   try {
//     const network = +process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
//     const { data } = await axios.get(`${process.env.BTC_BLOCK}tx/${network}/${hash}`);
//     return {
//       fee: data?.data?.fee,
//       from: data?.data?.inputs?.[0]?.address,
//       to: data?.data?.outputs?.[0]?.address,
//       date: data?.data?.time,
//       status: +data?.data?.confirmations > 0 ? 'Confirmed' : 'Failed',
//       value: +data?.data?.sent_value,
//       hash,
//     };
//   } catch (error) {
//     throw new Error(error);
//   }
// }
