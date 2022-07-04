// import { TxReceipt } from './types';
// import Web3 from 'web3';
// import { config } from 'dotenv';
// config();
// const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
// const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

// const web3 = new Web3(
//   new Web3.providers.HttpProvider(+process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
// );

// export async function ethTxReceipt(hash: string): Promise<TxReceipt> {
//   try {
//     const [receipt, details] = await Promise.all([
//       await web3.eth.getTransactionReceipt(hash),
//       await web3.eth.getTransaction(hash),
//     ]);
//     console.log({ receipt, details });
//     const block = await web3.eth.getBlock(details?.blockNumber);
//     console.log({ block });
//     return {
//       fee: (details.gas * +details.gasPrice) / 1000000000000000000,
//       from: details.from,
//       to: details.to,
//       date: block?.timestamp.toString() as string,
//       value: +details.value/ 1000000000000000000,
//       hash,
//       status: receipt.status ? 'Confirmed' : 'Pending',
//     };
//   } catch (error) {
//     console.log(error.message);
//     throw new Error(error);
//   }
// }



// export async function ethTokenTxReceipt(hash: string, contractAddress: string, abi: any): Promise<TxReceipt> {
//     try {
//         const contract = new web3.eth.Contract(abi, contractAddress);

//       const [receipt, details] = await Promise.all([
//         await web3.eth.getTransactionReceipt(hash),
//         await web3.eth.getTransaction(hash),
//       ]);
//       console.log({ receipt, details });
//       const block = await web3.eth.getBlock(details?.blockNumber);
//       console.log({ block });
//       return {
//         fee: (details.gas * +details.gasPrice) / 1000000000000000000,
//         from: details.from,
//         to: details.to,
//         date: block?.timestamp.toString() as string,
//         value: +details.value/ 1000000000000000000,
//         hash,
//         status: receipt.status ? 'Confirmed' : 'Pending',
//       };
//     } catch (error) {
//       console.log(error.message);
//       throw new Error(error);
//     }
//   }
  