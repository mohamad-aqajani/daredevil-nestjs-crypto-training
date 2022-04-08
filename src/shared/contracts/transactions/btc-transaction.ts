import axios from 'axios';
import * as BitcoreLib from 'bitcore-lib';

/**
 * Create BTC Transaction & BoardCast in network
 * @param {string} receiverAddress
 * @param {string} sourceAddress
 * @param {string} amount
 * @param {string} privateKey
 * @returns {string} transaction hash
 */
export async function sendBitcoin(
  receiverAddress: string,
  amount: number | string,
  sourceAddress: string,
  privateKey: string,
): Promise<string> {
  const network = process.env.IS_TESTNET ? 'BTCTEST' : 'BTC';
  const satoshiToSend = +amount * 100000000;

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

  transaction.from(inputs);
  transaction.to(receiverAddress, satoshiToSend);
  transaction.change(sourceAddress);
  transaction.feePerKb(10000);
  transaction.sign(privateKey);
  const serializedTransaction = transaction.serialize();
  const result = await axios({
    method: 'POST',
    url: `${process.env.BTC_BLOCK}send_tx/${network}`,
    data: {
      tx_hex: serializedTransaction,
    },
  });
  console.log(result.data.data);
  return result?.data?.data?.txid;
}
