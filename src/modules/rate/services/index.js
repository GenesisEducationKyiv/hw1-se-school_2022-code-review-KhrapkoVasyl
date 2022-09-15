'use strict';

const BinanceRateReciever = require('./rate-receivers/binance-rate.reciever');
const RateService = require('./rate.service');

const binanceRateReciever = new BinanceRateReciever();
const rateService = new RateService(binanceRateReciever);

module.exports = { rateService };
