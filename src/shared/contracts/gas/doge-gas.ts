import axios from 'axios';

/**
 * Get DOGE network fee
 * @param {string} sourceAddress
 * @returns {string} transaction fee
 */
export async function dogeGas(sourceAddress: string): Promise<number> {
  try {
    const network = +process.env.IS_TESTNET ? 'DOGETEST' : 'DOGE';
    let inputCount = 0;
    let outputCount = 2;
    const utxos_data = await axios.get(
      `${process.env.BTC_BLOCK}get_tx_unspent/${network}/${sourceAddress}`,
    );
    let totalAmountAvailable = 0;

    let inputs = [];
    //@ts-ignore
    utxos_data?.data?.data?.txs.forEach(async (element: any) => {
      let utxo: any = {};
      utxo.satoshis = Math.floor(Number(element.value) * 100000000);
      utxo.script = element.script_hex;
      //@ts-ignore
      utxo.address = utxos_data.data.data.address;
      utxo.txId = element.txid;
      utxo.outputIndex = element.output_no;
      totalAmountAvailable += utxo.satoshis;
      inputCount += 1;
      inputs.push(utxo);
    });
    const transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
    const fee = transactionSize * 500000;

    return fee / 100000000;
  } catch (error) {
    console.error(error);
  }
}
