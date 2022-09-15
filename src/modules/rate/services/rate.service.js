'use strict';

class RateService {
  #rateReciever;
  constructor(rateReciever) {
    this.#rateReciever = rateReciever;

    this.#rateReciever.getBtcUahRate =
      this.#rateReciever.getBtcUahRate.bind(this);
  }
  async getRate() {
    return this.#rateReciever.getBtcUahRate();
  }
}
module.exports = RateService;
