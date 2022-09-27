'use strict';

const fetch = require('node-fetch');

const RateProvider = require('./rate.provider');

class CoinbaseRateProvider extends RateProvider {
  #URL_API_BTC_TO_UAH_RATE;
  name = 'Coinbase';

  constructor() {
    super();
    this.#URL_API_BTC_TO_UAH_RATE =
      'https://api.coinbase.com/v2/prices/BTC-UAH/buy';

    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  getName() {
    return this.name;
  }

  async getBtcUahRate() {
    const response = await fetch(this.#URL_API_BTC_TO_UAH_RATE);

    const { data } = await response.json();
    const { amount } = data;
    const rate = parseInt(amount);

    if (!rate || isNaN(rate) || rate < 0)
      throw new Error('Invalid exchange rate value');

    return rate;
  }
}

module.exports = CoinbaseRateProvider;
