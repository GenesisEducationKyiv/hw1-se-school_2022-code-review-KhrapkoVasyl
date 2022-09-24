'use strict';
/* eslint-disable max-len */

const CoinbaseRateProviderCreator = require('./coinbase-rate-provider.creator');
const BinanceRateProviderCreator = require('./binance-rate-provider.creator');
const CoinmarketRateProviderCreator = require('./coinmarket-rate-provider.creator');

require('dotenv').config();

let rateProviderCreator;
const CRYPTO_CURRENCY_PROVIDER = process.env.CRYPTO_CURRENCY_PROVIDER || '';
switch (CRYPTO_CURRENCY_PROVIDER) {
  case 'Coinmarket':
    rateProviderCreator = new CoinmarketRateProviderCreator();
    break;
  case 'Coinbase':
    rateProviderCreator = new CoinbaseRateProviderCreator();
    break;
  case 'Binance':
  default:
    rateProviderCreator = new BinanceRateProviderCreator();
}

console.log(rateProviderCreator);
module.exports = { rateProviderCreator };
