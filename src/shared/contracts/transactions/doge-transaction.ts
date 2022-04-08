import axios from 'axios';
import * as BitcoreLibDoge from 'bitcore-lib-doge';

/**
 * Create Doge Transaction & BoardCast in network
 * @param {string} receiverAddress
 * @param {string} sourceAddress
 * @param {string} amount
 * @param {string} privateKey
 * @returns {string} transaction hash
 */
export async function sendDoge(
  receiverAddress: string,
  amount: number | string,
  sourceAddress: string,
  privateKey: string,
): Promise<any> {
  const network = process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';

  let inputCount = 0;
  let outputCount = 2;
  const utxos = await axios.get(
    `https://sochain.com/api/v2/get_tx_unspent/${network}/${sourceAddress}`,
  );
  console.log({ utxos: utxos.data.data.txs });
  const transaction = new BitcoreLibDoge.Transaction();
  let totalAmountAvailable = 0;

  let inputs = [];
  utxos?.data?.data?.txs?.forEach(async (element: any) => {
    let utxo: any = {};
    utxo.satoshis = Math.floor(Number(element.value) * 100000000);
    utxo.script = element.script_hex;
    utxo.address = utxos.data.data.address;
    utxo.txId = element.txid;
    utxo.outputIndex = element.output_no;
    totalAmountAvailable += utxo.satoshis;
    inputCount += 1;
    inputs.push(utxo);
  });

  transaction.from(inputs);
  transaction.to(receiverAddress, +amount * 100000000);
  transaction.change(sourceAddress);
  transaction.sign(privateKey);

  const serializedTransaction = transaction.serialize();
  console.log({ serializedTransaction });
  const result = await axios({
    method: 'POST',
    url: `https://sochain.com/api/v2/send_tx/${network}`,
    data: {
      tx_hex: serializedTransaction,
    },
  });
  console.log({ result: result.data.data });
  return result?.data?.data?.txid;
}
