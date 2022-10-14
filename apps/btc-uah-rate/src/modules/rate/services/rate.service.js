'use strict';

class RateService {
  #rateProvider;
  constructor(rateProvider) {
    this.#rateProvider = rateProvider;

    this.#rateProvider.getBtcUahRate =
      this.#rateProvider.getBtcUahRate.bind(this);
  }
  async getRate() {
    return this.#rateProvider.getBtcUahRate();
  }
}

module.exports = RateService;
