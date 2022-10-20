'use strict';

// Interface for describing the contract,
// which should implement Rate Receiver Class

class RateProvider {
  name = 'Provider';

  getName() {
    return this.name;
  }
  async getBtcUahRate() {}
}

module.exports = RateProvider;
