'use strict';

class RateProviderLoggingDecorator {
  constructor(rateProvider) {
    this.rateProvider = rateProvider;
    this.loggingPattern = '[NAME] - Response: {rate: [RATE]}';
    this.defaultProviderName = 'Provider';
    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  logRate(rate) {
    const name = this.getName();
    const loggingMessage = this.loggingPattern
      .replaceAll('[NAME]', name || this.defaultProviderName)
      .replaceAll('[RATE]', rate);
    console.log(loggingMessage);
  }

  getName() {
    return this.rateProvider.getName();
  }

  async getBtcUahRate() {
    const rate = await this.rateProvider.getBtcUahRate();
    this.logRate(rate);
    return rate;
  }
}

module.exports = RateProviderLoggingDecorator;
