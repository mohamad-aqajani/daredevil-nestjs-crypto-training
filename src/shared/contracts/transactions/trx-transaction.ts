import TronWeb from 'tronweb';
import BigNumber from 'bignumber.js';

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(process.env.TRX_BLOCK);
const solidityNode = new HttpProvider(process.env.TRX_SOLIDITY_NODE);
const eventServer = new HttpProvider(process.env.TRX_SERVER_EVENT);

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

/**
 * Create TRX Transaction & BoardCast in network
 * @param {string} sourceAddress
 * @param {string} targetAddress
 * @param {string} amount
 * @param {string} privateKey
 * @returns {string} transaction hash
 */
export async function sendTron(
  sourceAddress: string,
  targetAddress: string,
  amount: number,
  privateKey: string,
): Promise<string> {
  try {
    tronWeb.setPrivateKey(privateKey);
    const ballance = await tronWeb.trx.getBalance(sourceAddress);
    if (!ballance) return null;

    const tradeObject = await tronWeb.transactionBuilder.sendTrx(
      targetAddress,
      +amount,
      sourceAddress,
    );

    const signedTxn = await tronWeb.trx.sign(tradeObject, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedTxn);
    if (receipt?.result && receipt?.transaction) {
      return receipt?.transaction?.txID;
    } else return null;
  } catch (error) {
    console.log({ error });
    throw error;
    return null;
  }
}

/**
 * Create and boardCast TRC20 Token Transaction
 * @param {string} toAddress
 * @param {string} tokenAmount
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {number | string} gas
 * @returns {string} transaction hash
 */
export async function sendTRC20Contract(
  toAddress: string,
  tokenAmount: string | number,
  contractAddress: string,
  privateKey: string,
  gas: number | string = 100000,
): Promise<string> {
  try {
    tronWeb.setPrivateKey(privateKey);
    const { abi } = await tronWeb.trx.getContract(contractAddress);
    const contract = tronWeb.contract(abi.entrys, contractAddress);
    const decimals = await contract.decimals().call();
    let { transaction, result } = await tronWeb.transactionBuilder.triggerSmartContract(
      contractAddress,
      'transfer(address,uint256)',
      {
        feeLimit: 1e10,
        callValue: 0,
      },
      [
        {
          type: 'address',
          value: toAddress,
        },
        {
          type: 'uint256',
          value: tronWeb
            //@ts-ignore
            .BigNumber(+tokenAmount * Math.pow(10, decimals).toString())
            .toString(),
        },
      ],
    );
    if (!result.result) {
      console.error('error:', result);
      return;
    }

    const signedtxn = await tronWeb.trx.sign(transaction, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    if (receipt?.code === 'BANDWITH_ERROR') {
      throw new Error('Not enough TRX to pay for the transaction');
    }
    if (receipt?.result && receipt?.transaction) {
      return receipt?.transaction?.txID;
    } else return null;
  } catch (error) {
    console.log(error);
  }
}
