'use strict';

const BinanceRateProvider = require('../binance-rate.provider');
const RateProviderCreator = require('./rate-provider.creator');

class BinanceRateProviderCreator extends RateProviderCreator {
  createRateProvider() {
    return new BinanceRateProvider();
  }
}

module.exports = BinanceRateProviderCreator;
