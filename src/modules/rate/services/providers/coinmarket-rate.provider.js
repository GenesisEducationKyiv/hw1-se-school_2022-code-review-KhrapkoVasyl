'use strict';

const { COINMARKET_API_KEY } = require('../../../../config');
const fetch = require('node-fetch');

const RateProvider = require('./rate.provider');

class CoinmarketRateProvider extends RateProvider {
  #URL_API_BTC_TO_UAH_RATE;
  #API_KEY;
  providerName = 'Coinmarket';

  constructor() {
    super();
    this.#URL_API_BTC_TO_UAH_RATE =
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
    this.#API_KEY = COINMARKET_API_KEY;
    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  async getBtcUahRate() {
    const queryParams = 'symbol=BTC&convert=UAH';
    const response = await fetch(
      this.#URL_API_BTC_TO_UAH_RATE + `?${queryParams}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': this.#API_KEY,
        },
      }
    );

    const { data } = await response.json();
    const price = data.BTC[0].quote.UAH.price;
    const rate = parseInt(price);

    if (!rate || isNaN(rate) || rate < 0)
      throw new Error('Invalid exchange rate value');

    return rate;
  }
}

module.exports = CoinmarketRateProvider;
