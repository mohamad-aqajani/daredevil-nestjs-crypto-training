import Web3 from 'web3';

const ethBlock = process.env.ETH_BLOCK + process.env.ETH_PROJECT_KEY;
const ethTestnetBlock = process.env.ETH_TESTNET_BLOCK + process.env.ETH_PROJECT_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.IS_TESTNET ? ethTestnetBlock : ethBlock),
);

/**
 * Get Ethereum balance
 * @param {string} address
 * @returns {Promise<number>} balance
 */
export async function ethBalance(address: string): Promise<number> {
  const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
  return +balance;
}

/**
 * Get Ethereum token balance
 * @param {string} address
 * @param {string} contractAddress
 * @param {any} contractAbi
 * @returns {Promise<number>} balance
 */
export async function ethContractBalance(
  address: string,
  contractAddress: string,
  contractAbi: any,
): Promise<number> {
  var contract = new web3.eth.Contract(JSON.parse(contractAbi), contractAddress);
  const balance = await contract.methods.balanceOf(address).call();
  const formatted = web3.utils.fromWei(balance);
  return +formatted;
}
