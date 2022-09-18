'use strict';

const BinanceRateProvider = require('../providers/binance-rate.provider');
const RateProviderCreator = require('./rate-provider.creator');

class BinanceRateProviderCreator extends RateProviderCreator {
  createRateProvider() {
    return new BinanceRateProvider();
  }
}

module.exports = BinanceRateProviderCreator;
