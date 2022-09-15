/* eslint-disable max-len */
'use strict';

const BinanceRateReciever = require('./binance-rate.reciever');

const binanceRateReciever = new BinanceRateReciever();

describe('RateReciever.getRate() testing', () => {
  test('Should return the value of the exchange rate, the value should be an integer greater than zero', async () => {
    try {
      const rate = await binanceRateReciever.getBtcUahRate();

      expect(typeof rate).toBe('number');
      expect(Number.isInteger(rate)).toBe(true);
      expect(rate > 0).toBe(true);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
