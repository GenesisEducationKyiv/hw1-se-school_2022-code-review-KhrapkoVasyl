'use strict';

const RateProviderCreator = require('./rate-provider.creator');
const CoinmarketRateProvider = require('../coinmarket-rate.provider');

class CoinmarketRateProviderCreator extends RateProviderCreator {
  createRateProvider() {
    return new CoinmarketRateProvider();
  }
}

module.exports = CoinmarketRateProviderCreator;
