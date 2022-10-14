/* eslint-disable max-len */
'use strict';

const RateProviderChainDecorator = require('./decorators/rate-provider-chain.decorator');
const RateProviderLoggingDecorator = require('./decorators/rate-provider-logging.decorator');
const RateProviderCachingProxy = require('./proxies/rate-provider-caching.proxy');

const BinanceRateProvider = require('./binance-rate.provider');
const CoinbaseRateProvider = require('./coinbase-rate.provider');
const CoinmarketRateProvider = require('./coinmarket-rate.provider');

const binanceRateProvider = new BinanceRateProvider();
const coinbaseRateProvider = new CoinbaseRateProvider();
const coinmarketRateProvider = new CoinmarketRateProvider();

const binanceRateProviderWithLogging = new RateProviderLoggingDecorator(
  binanceRateProvider
);
const coinbaseRateProviderWithLogging = new RateProviderLoggingDecorator(
  coinbaseRateProvider
);
const coinmarketRateProviderWithLogging = new RateProviderLoggingDecorator(
  coinmarketRateProvider
);

const binanceRateProviderChain = new RateProviderChainDecorator(
  binanceRateProviderWithLogging
);
const coinbaseRateProviderChain = new RateProviderChainDecorator(
  coinbaseRateProviderWithLogging
);
const coinmarketRateProviderChain = new RateProviderChainDecorator(
  coinmarketRateProviderWithLogging
);

binanceRateProviderChain.setNext(coinbaseRateProviderChain);
coinbaseRateProviderChain.setNext(coinmarketRateProviderChain);

const rateProvider = new RateProviderCachingProxy(binanceRateProviderChain);

module.exports = { rateProvider };
