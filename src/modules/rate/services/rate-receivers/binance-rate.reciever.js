'use strict';

const fetch = require('node-fetch');

const RateReciever = require('./rate.reciever');

class BinanceRateReciever extends RateReciever {
  #URL_API_BTC_TO_UAH_RATE;

  constructor() {
    super();
    this.#URL_API_BTC_TO_UAH_RATE =
      'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';

    this.getBtcUahRate = this.getBtcUahRate.bind(this);
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

module.exports = BinanceRateReciever;
