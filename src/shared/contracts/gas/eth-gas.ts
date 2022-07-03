import Web3 from 'web3';
import { config } from 'dotenv';
config();

const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider (+process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
);

/**
 * Get ERC20 network fee
 * @param {string} resourceAddress
 * @param {string} targetAddress
 * @param {string} contractAddress
 * @param {any} abi
 * @param {number} tokenAmount
 * @returns {any} transaction fee
 */
export async function ethERC20Gas(
  resourceAddress: string,
  targetAddress: string,
  contractAddress: any,
  abi: any,
  tokenAmount: any,
): Promise<number> {
  try {
    var gasPrice = await web3.eth.getGasPrice();
  const amount = web3.utils.toBN(tokenAmount);
  const contract = new web3.eth.Contract(JSON.parse(abi), contractAddress);
  const decimal = await contract.methods.decimals().call(function (error, d) {
    console.log({d, error})
    if (!error) return d;
  });
  const decimals = web3.utils.toBN(decimal);
  const value = amount.mul(web3.utils.toBN(10).pow(decimals));
  let data = contract.methods.transfer(targetAddress, value).encodeABI();
  var transactionObject = {
    from: resourceAddress,
    to: targetAddress,
    gasPrice: gasPrice,
    data,
  };

  var gasLimit = await web3.eth.estimateGas(transactionObject);
  //@ts-ignore
  return web3.utils.fromWei((+gasPrice * +gasLimit).toString(), 'ether');
  } catch (error) {
    console.log({error});
    throw new Error(error);
  }
}

/**
 * Get ETH network fee
 * @param {string} resourceAddress
 * @param {string} targetAddress
 * @param {any} data
 * @returns {any} transaction fee
 */
export async function ethGas(
  resourceAddress: string,
  targetAddress: string,
  data?: any,
): Promise<number> {
  try {
    var gasPrice = await web3.eth.getGasPrice();
    var transactionObject = {
      from: resourceAddress,
      to: targetAddress,
      gasPrice: gasPrice,
    };

    if (data)
      //@ts-ignore
      transactionObject.data = data;

    var gasLimit = await web3.eth.estimateGas(transactionObject);
    //@ts-ignore
    return web3.utils.fromWei((+gasPrice * +gasLimit).toString(), 'ether');
  } catch (error) {
    throw new Error(error);
  }
}
