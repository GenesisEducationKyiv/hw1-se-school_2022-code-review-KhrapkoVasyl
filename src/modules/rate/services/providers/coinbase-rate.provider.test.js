/* eslint-disable max-len */
'use strict';

const CoinbaseRateProvider = require('./coinbase-rate.provider');

const coinbaseRateProvider = new CoinbaseRateProvider();

describe('CoinbaseRateProvider.getRate() testing', () => {
  test('Should return the value of the exchange rate, the value should be an integer greater than zero', async () => {
    try {
      const rate = await coinbaseRateProvider.getBtcUahRate();

      expect(typeof rate).toBe('number');
      expect(Number.isInteger(rate)).toBe(true);
      expect(rate > 0).toBe(true);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
