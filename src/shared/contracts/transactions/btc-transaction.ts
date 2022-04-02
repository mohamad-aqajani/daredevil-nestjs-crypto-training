import axios from 'axios';
import * as BitcoreLib from 'bitcore-lib';

export async function sendBitcoin(receiverAddress, amount, sourceAddress, privateKey) {
  const network = process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
  const satoshiToSend = amount * 100000000;
//   let fee = 0;
  let inputCount = 0;
  let outputCount = 2;
  const utxos_data = await axios.get(
    `${process.env.BTC_BLOCK}get_tx_unspent/${network}/${sourceAddress}`,
  );
  const transaction = new BitcoreLib.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  utxos_data.data?.data?.txs.forEach(async (element: any) => {
    let utxo: any = {};
    utxo.satoshis = Math.floor(Number(element.value) * 100000000);
    utxo.script = element.script_hex;
    utxo.address = utxos_data.data.data.address;
    utxo.txId = element.txid;
    utxo.outputIndex = element.output_no;
    totalAmountAvailable += utxo.satoshis;
    inputCount += 1;
    inputs.push(utxo);
  });

//   const transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
  // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte

  //   fee = transactionSize * 20;
//   if (totalAmountAvailable - satoshiToSend - fee < 0) {
//     throw new Error('Balance is too low for this transaction');
//   }
  //Set transaction input
  transaction.from(inputs);

  // set the receiving address and the amount to send
  transaction.to(receiverAddress, satoshiToSend);

  // Set change address - Address to receive the left over funds after transfer
  transaction.change(sourceAddress);

  transaction.feePerKb(10000);

  // Sign transaction with private key
  transaction.sign(privateKey);

  // serialize Transactions
  const serializedTransaction = transaction.serialize();
  // Send transaction
  const result = await axios({
    method: 'POST',
    url: `${process.env.BTC_BLOCK}send_tx/${network}`,
    data: {
      tx_hex: serializedTransaction,
    },
  });
  console.log(result.data.data);
  return result.data.data;
}
