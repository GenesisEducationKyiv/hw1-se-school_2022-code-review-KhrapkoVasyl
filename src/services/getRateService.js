'use strict';

const fetch = require('node-fetch');
const { URL_API_BTC_TO_UAH_RATE } = require('../config');

const getRateService = async () => {
  const response = await fetch(URL_API_BTC_TO_UAH_RATE);
  const { price } = await response.json();
  const rate = parseInt(price);

  if (!rate || isNaN(rate) || rate < 0)
    throw new Error('Invalid exchange rate value');

  return rate;
};

module.exports = getRateService;
