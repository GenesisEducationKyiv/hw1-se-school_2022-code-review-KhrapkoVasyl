'use strict';

const NodeCache = require('node-cache');

class RateProviderCachingProxy {
  #ratesCache;
  #TTL = 2; // in seconds
  constructor(rateProvider) {
    this.rateProvider = rateProvider;
    this.cacheKeyName = 'rate';
    this.#ratesCache = new NodeCache();
    this.getBtcUahRate = this.getBtcUahRate.bind(this);
  }

  getName() {
    return this.rateProvider.getName();
  }

  async getBtcUahRate() {
    const cachedRate = this.#ratesCache.get(this.cacheKeyName);
    if (cachedRate) return cachedRate;

    const rate = await this.rateProvider.getBtcUahRate();
    this.#ratesCache.set(this.cacheKeyName, rate, this.#TTL);
    return rate;
  }
}

module.exports = RateProviderCachingProxy;
