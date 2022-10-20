'use strict';

const fetch = require('node-fetch');

const RateProvider = require('./rate.provider');

class BinanceRateProvider extends RateProvider {
  #URL_API_BTC_TO_UAH_RATE;
  name = 'Binance';

  constructor() {
    super();
    this.#URL_API_BTC_TO_UAH_RATE =
      'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';

    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  getName() {
    return this.name;
  }

  async getBtcUahRate() {
    const response = await fetch(this.#URL_API_BTC_TO_UAH_RATE);
    const { price } = await response.json();
    const rate = parseInt(price);

    if (!rate || isNaN(rate) || rate < 0)
      throw new Error('Invalid exchange rate value');

    return rate;
  }
}

module.exports = BinanceRateProvider;
