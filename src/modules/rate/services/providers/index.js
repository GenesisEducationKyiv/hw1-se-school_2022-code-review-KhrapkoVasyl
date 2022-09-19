'use strict';

// eslint-disable-next-line max-len
const RateProviderChainDecorator = require('./decorators/rate-provider-chain.decorator');

const BinanceRateProvider = require('./binance-rate.provider');
const CoinbaseRateProvider = require('./coinbase-rate.provider');
const CoinmarketRateProvider = require('./coinmarket-rate.provider');

const binanceRateProvider = new BinanceRateProvider();
const coinbaseRateProvider = new CoinbaseRateProvider();
const coinmarketRateProvider = new CoinmarketRateProvider();

const binanceRateProviderChain = new RateProviderChainDecorator(
  binanceRateProvider
);
const coinbaseRateProviderChain = new RateProviderChainDecorator(
  coinbaseRateProvider
);
const coinmarketRateProviderChain = new RateProviderChainDecorator(
  coinmarketRateProvider
);

binanceRateProviderChain.setNext(coinbaseRateProviderChain);
coinbaseRateProviderChain.setNext(coinmarketRateProviderChain);

module.exports = { rateProvider: binanceRateProviderChain };
