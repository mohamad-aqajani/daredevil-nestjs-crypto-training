import TronWeb from 'tronweb';

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(
  +process.env.IS_TESTNET ? process.env.TRX_TEST_BLOCK : process.env.TRX_BLOCK,
);
const solidityNode = new HttpProvider(
  +process.env.IS_TESTNET ? process.env.TRX_TEST_SOLIDITY_NODE : process.env.TRX_SOLIDITY_NODE,
);
const eventServer = new HttpProvider(
  +process.env.IS_TESTNET ? process.env.TRX_TEST_SERVER_EVENT : process.env.TRX_SERVER_EVENT,
);

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

/**
 * Get Tron balance
 * @param {string} address
 * @returns {Promise<number>} balance
 */
export async function trxBalance(address: string): Promise<number> {
  let account = await tronWeb.trx.getAccount(address);
  return +account?.balance/1000000 || 0;
}

/**
 * Get Tron token balance
 * @param {string} address
 * @param {string} contractAddress
 * @returns {Promise<number>} balance
 */
export async function trxContractBalance(
  address: string,
  contractAddress: string,
  contractAbi: any,
): Promise<number> {
  tronWeb.setAddress(address);
  const { abi } = await tronWeb.trx.getContract(contractAddress);
  const contract = tronWeb.contract(abi.entrys, contractAddress);
  const decimals = await contract.decimals().call();
  const balance = await contract.methods.balanceOf(address).call();
  return +(+balance / Math.pow(10, decimals)).toFixed(6);
}
