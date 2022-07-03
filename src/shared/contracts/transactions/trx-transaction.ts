import TronWeb from 'tronweb';
import BigNumber from 'bignumber.js';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(process.env.TRX_BLOCK);
const solidityNode = new HttpProvider(process.env.TRX_SOLIDITY_NODE);
const eventServer = new HttpProvider(process.env.TRX_SERVER_EVENT);

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

/**
 * Create TRX Transaction
 * @param {string} sourceAddress
 * @param {string} targetAddress
 * @param {string} amount
 * @param {string} privateKey
 * @returns {string} transaction object
 */
export async function createTrxTransaction(
  sourceAddress: string,
  targetAddress: string,
  amount: number,
  privateKey: string,
): Promise<any> {
  console.log({...arguments})
  try {
    tronWeb.setPrivateKey(privateKey);
    // tronWeb.setAddress(sourceAddress);
    const ballance = await tronWeb.trx.getBalance(sourceAddress);
    console.log({ballance})
    if (+ballance/1000000 < amount ) throw new BadRequestException('Not enough Trx in your account.');

    const tradeObject = await tronWeb.transactionBuilder.sendTrx(
      targetAddress,
      +amount*1000000,
      sourceAddress,
    );
    return tradeObject;
  } catch (errorX) {
    throw new Error(errorX)
  }
}

/**
 * Create TRC20 Token Transaction
 * @param {string} toAddress
 * @param {string} tokenAmount
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {number | string} gas
 * @returns {any} transaction object
 */
export async function createTRC20Contract(
  toAddress: string,
  tokenAmount: string | number,
  contractAddress: string,
  privateKey: string,
  gas: number | string = 100000,
): Promise<any> {
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
      return null;
    }
    return transaction;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Sign And Boardcast Tron Transaction
 * @param {any} transaction
 * @param {any} privateKey
 * @returns {string} transaction hash
 */
export async function signAndBoardCastTrxTransaction(
  transaction: any,
  privateKey: string,
): Promise<string> {
  try {
    const signedtxn = await tronWeb.trx.sign(transaction, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    // if (receipt?.code === 'BANDWITH_ERROR'  || 'CONTRACT_VALIDATE_ERROR') {
    //   throw new Error('Not enough TRX to pay for the transaction');
    // }
    if (receipt?.result && receipt?.transaction?.txID) {
      console.log({transaction})
      return receipt?.transaction?.txID;
    } else throw new Error('Wrong Request. Please check properties.');
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Send TRX Transaction
 * @param {string} sourceAddress
 * @param {string} targetAddress
 * @param {string} amount
 * @param {string} privateKey
 * @param {string} contractAddress
 * @returns {string} transaction hash
 */
export async function sendTRX(
  sourceAddress: string,
  targetAddress: string,
  amount: number,
  privateKey: string,
  contractAddress?: string,
): Promise<string> {
  const transaction = contractAddress
    ? await createTRC20Contract(targetAddress, amount, contractAddress, privateKey)
    : await createTrxTransaction(sourceAddress, targetAddress, amount, privateKey);
  if (!transaction) throw new InternalServerErrorException();
  return await signAndBoardCastTrxTransaction(transaction, privateKey);
}
