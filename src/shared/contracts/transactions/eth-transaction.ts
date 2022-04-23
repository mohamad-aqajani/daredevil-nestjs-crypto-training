import Web3 from 'web3';
import { SignedTransaction } from './types';

const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
);

/**
 * Create Ethereum Transaction
 * @param {string} addressTo
 * @param {string} resourceAddress
 * @param {string} amount
 * @param {string} privateKey
 * @param { number | string} gas
 * @returns {SignedTransaction} transaction object
 */
export async function createEthTransaction(
  addressTo: string,
  resourceAddress: string,
  amount: string | number,
  privateKey: string,
  gas: number | string = 21000,
): Promise<SignedTransaction> {
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: resourceAddress,
      to: addressTo,
      value: web3.utils.toWei(amount.toString(), 'ether'),
      gas,
    },
    privateKey,
  );
  return createTransaction;
}

/**
 * Sign And Boardcast Ethereum Transaction
 * @param {SignedTransaction} transaction
 * @returns {string} transaction hash
 */
export async function SignAndBoardCastEthTransaction(
  transaction: SignedTransaction,
): Promise<string> {
  const createReceipt = await web3.eth.sendSignedTransaction(transaction.rawTransaction);
  if (createReceipt.status) return createReceipt.transactionHash;
  return '';
}

/**
 * Create ERC20 Token Transaction
 * @param {string} toAddress
 * @param {string} fromAddress
 * @param {string} tokenAmount
 * @param {Array} abi
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {number | string} gas
 * @return {SignedTransaction} transaction object
 */
export async function createERC20Contract(
  toAddress: string,
  fromAddress: string,
  tokenAmount: string | number,
  abi: any,
  contractAddress: string,
  privateKey: string,
  gas: number | string = 100000,
): Promise<SignedTransaction> {
  web3.eth.accounts.wallet.add(privateKey);
  const amount = web3.utils.toBN(tokenAmount);
  const contract = new web3.eth.Contract(abi, contractAddress);
  const decimal = await contract.methods.decimals().call(function (error, d) {
    if (!error) return d;
  });
  const decimals = web3.utils.toBN(decimal);
  const value = amount.mul(web3.utils.toBN(10).pow(decimals));
  let data = contract.methods.transfer(toAddress, value).encodeABI();
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: fromAddress,
      to: contractAddress,
      gas: web3.utils.toHex(gas),
      data,
    },
    privateKey,
  );

  return createTransaction;
}

/**
 * Send Ethereum Transaction
 * @param {string} addressTo
 * @param {string} resourceAddress
 * @param {string} amount
 * @param {string} privateKey
 * @param { number | string} gas
 * @returns {SignedTransaction} transaction hash
 */
export async function sendETH(
  toAddress: string,
  fromAddress: string,
  amount: string | number,
  abi: any,
  contractAddress: string,
  privateKey: string,
  gas: number | string = 100000,
): Promise<string> {
  const transaction = contractAddress
    ? await createERC20Contract(
        toAddress,
        fromAddress,
        amount,
        abi,
        contractAddress,
        privateKey,
        gas,
      )
    : await createEthTransaction(toAddress, fromAddress, amount, privateKey, gas);
  if (!transaction) return '';
  return await SignAndBoardCastEthTransaction(transaction);
}
