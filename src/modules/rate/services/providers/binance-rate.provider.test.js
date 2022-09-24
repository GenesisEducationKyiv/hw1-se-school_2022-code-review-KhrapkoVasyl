/* eslint-disable max-len */
'use strict';

const BinanceRateProvider = require('./binance-rate.provider');

const binanceRateProvider = new BinanceRateProvider();

describe('RateProvider.getRate() testing', () => {
  test('Should return the value of the exchange rate, the value should be an integer greater than zero', async () => {
    try {
      const rate = await binanceRateProvider.getBtcUahRate();

      expect(typeof rate).toBe('number');
      expect(Number.isInteger(rate)).toBe(true);
      expect(rate > 0).toBe(true);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
