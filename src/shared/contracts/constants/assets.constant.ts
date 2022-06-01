import { Asset } from '@shared/entities/asset-entity';
import { AssetType } from 'enums/assets.enum';
import { NetworkType } from 'enums/network.enum';
import { bnbAbi } from './contractAbi/bnb';
import { tetherEthAbi } from './contractAbi/eth.tether';
import { justAbi } from './contractAbi/just';
import { maticAbi } from './contractAbi/matic';
import { mohiAbi } from './contractAbi/mohammad';
import { sandAbi } from './contractAbi/sand';
import { shibaAbi } from './contractAbi/shiba';
import { tetherTrxAbi } from './contractAbi/tether.trx';

export const assets: Partial<Asset>[] = [
  // {
  //   name: 'Bitcoin',
  //   symbol: 'BTC',
  //   decimals: 8,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1.png',
  //   type: AssetType.COIN,
  // },
  // {
  //   name: 'Ethereum',
  //   symbol: 'ETH',
  //   decimals: 18,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png',
  //   type: AssetType.COIN,
  // },
  // {
  //   name: 'Litecoin',
  //   symbol: 'LTC',
  //   decimals: 8,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/2.png',
  //   type: AssetType.COIN,
  // },
  // // {
  // //   name: 'Bitcoin Cash',
  // //   symbol: 'BCH',
  // //   decimals: 8,
  // //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1831.png',
  // //   type: AssetType.COIN,
  // // },
  // {
  //   name: 'Dogecoin',
  //   symbol: 'DOGE',
  //   decimals: 8,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/74.png',
  //   type: AssetType.COIN,
  // },
  // {
  //   name: 'Ripple',
  //   symbol: 'XRP',
  //   decimals: 6,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/52.png',
  //   type: AssetType.COIN,
  // },
  // {
  //   name: 'Tron',
  //   symbol: 'TRX',
  //   decimals: 6,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png',
  //   type: AssetType.COIN,
  // },
  // /**Tokens */
  // {
  //   name: 'Tether(ERC20)',
  //   symbol: 'USDT',
  //   decimals: 6,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/825.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //   network: NetworkType.ETH,
  //   contractAbi: tetherEthAbi,
  //   contractType: 'ERC20',
  // },
  // {
  //   name: 'BNB',
  //   symbol: 'BNB',
  //   decimals: 18,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  //   network: NetworkType.ETH,
  //   contractAbi: bnbAbi,
  //   contractType: 'ERC20',
  // },
  // {
  //   name: 'Shiba Inu',
  //   symbol: 'SHIB',
  //   decimals: 18,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  //   network: NetworkType.ETH,
  //   contractAbi: shibaAbi,
  //   contractType: 'ERC20',
  // },
  // {
  //   name: 'Matic',
  //   symbol: 'MATIC',
  //   decimals: 18,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  //   network: NetworkType.ETH,
  //   contractAbi: maticAbi,
  //   contractType: 'ERC20',
  // },
  // {
  //   name: 'SAND',
  //   symbol: 'SAND',
  //   decimals: 18,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6210.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
  //   network: NetworkType.ETH,
  //   contractAbi: sandAbi,
  //   contractType: 'ERC20',
  // },
  // /**TRC20*/
  // {
  //   name: 'Tether(TrC20)',
  //   symbol: 'USDT',
  //   decimals: 6,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/825.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  //   network: NetworkType.TRX,
  //   contractAbi: tetherTrxAbi,
  //   contractType: 'TRC20',
  // },
  // {
  //   name: 'JUST',
  //   symbol: 'JST',
  //   decimals: 18,
  //   logo: 'https://coin.top/production/logo/just_icon.png',
  //   type: AssetType.TOKEN,
  //   contractAddress: 'TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9',
  //   network: NetworkType.TRX,
  //   contractAbi: justAbi,
  //   contractType: 'TRC20',
  // },
];

export const test_assets: Partial<Asset>[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 8,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1.png',
    type: AssetType.COIN,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png',
    type: AssetType.COIN,
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    decimals: 8,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/2.png',
    type: AssetType.COIN,
  },
  // {
  //   name: 'Bitcoin Cash',
  //   symbol: 'BCH',
  //   decimals: 8,
  //   logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1831.png',
  //   type: AssetType.COIN,
  // },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    decimals: 8,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/74.png',
    type: AssetType.COIN,
  },
  {
    name: 'MOHI(ERC20)',
    symbol: 'MHM',
    decimals: 18,
    logo: 'https://www.freeiconspng.com/thumbs/coin-icon/empty-gold-coin-icon-19.jpg',
    type: AssetType.TOKEN,
    contractAddress: '0xFab46E002BbF0b4509813474841E0716E6730136',
    network: NetworkType.ETH,
    contractAbi: mohiAbi,
    contractType: 'ERC20',
  },
  {
    name: 'Ripple',
    symbol: 'XRP',
    decimals: 6,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/52.png',
    type: AssetType.COIN,
  },
  {
    name: 'Tron',
    symbol: 'TRX',
    decimals: 6,
    logo: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png',
    type: AssetType.COIN,
  },
];
