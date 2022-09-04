/* eslint-disable max-len */
'use strict';

const getRateService = require('../getRateService');

describe('getRate service testing', () => {
  test('Should return the value of the exchange rate, the value should be an integer greater than zero', async () => {
    try {
      const rate = await getRateService();

      expect(typeof rate).toBe('number');
      expect(Number.isInteger(rate)).toBe(true);
      expect(rate > 0).toBe(true);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
