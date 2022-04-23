/**
 * Get XRP network fee
 * @param {boolean} isContract
 * @returns {any} transaction fee
 */
export async function trxGas(isContract?: boolean): Promise<string | number> {
  return isContract ? 15 : 2;
}
