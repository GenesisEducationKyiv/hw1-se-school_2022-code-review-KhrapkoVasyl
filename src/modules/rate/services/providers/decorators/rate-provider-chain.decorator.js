'use strict';

class RateProviderChainDecorator {
  constructor(rateProvider) {
    this.rateProvider = rateProvider;

    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  setNext(nextRateProvider) {
    this.nextRateProvider = nextRateProvider;
  }

  async getBtcUahRate() {
    try {
      return await this.rateProvider.getBtcUahRate();
    } catch (err) {
      if (!this.nextRateProvider) throw err;
      return await this.nextRateProvider.getBtcUahRate();
    }
  }
}

module.exports = RateProviderChainDecorator;
