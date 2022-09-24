/* eslint-disable max-len */
'use strict';

const CoinmarketRateProvider = require('./coinmarket-rate.provider');

const coinmarketRateProvider = new CoinmarketRateProvider();

describe('CoinmarketRateProvider.getRate() testing', () => {
  test('Should return the value of the exchange rate, the value should be an integer greater than zero', async () => {
    try {
      const rate = await coinmarketRateProvider.getBtcUahRate();

      expect(typeof rate).toBe('number');
      expect(Number.isInteger(rate)).toBe(true);
      expect(rate > 0).toBe(true);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
