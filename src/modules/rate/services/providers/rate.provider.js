'use strict';

// Interface for describing the contract,
// which should implement Rate Receiver Class

class RateProvider {
  providerName = 'Provider';
  async getBtcUahRate() {}
}

module.exports = RateProvider;
