'use strict';

class RateProviderLoggingDecorator {
  constructor(rateProvider) {
    this.rateProvider = rateProvider;
    this.loggingPattern = '[NAME] - Response: {rate: [RATE]}';
    this.defailtProviderName = 'Provider';
    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  logRate(rate) {
    const loggingMessage = this.loggingPattern
      .replaceAll(
        '[NAME]',
        this.rateProvider.providerName || this.defailtProviderName
      )
      .replaceAll('[RATE]', rate);
    console.log(loggingMessage);
  }

  async getBtcUahRate() {
    const rate = await this.rateProvider.getBtcUahRate();
    this.logRate(rate);
    return rate;
  }
}

module.exports = RateProviderLoggingDecorator;
