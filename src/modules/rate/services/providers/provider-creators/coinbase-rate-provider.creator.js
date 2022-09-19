'use strict';

const CoinbaseRateProvider = require('../coinbase-rate.provider');
const RateProviderCreator = require('./rate-provider.creator');

class CoinbaseRateProviderCreator extends RateProviderCreator {
  createRateProvider() {
    return new CoinbaseRateProvider();
  }
}

module.exports = CoinbaseRateProviderCreator;
