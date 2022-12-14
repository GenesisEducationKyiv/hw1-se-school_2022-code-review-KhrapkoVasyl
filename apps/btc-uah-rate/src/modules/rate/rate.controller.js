'use strict';

const { loggerService } = require('../logger');

class RateController {
  #rateService;

  constructor(rateService) {
    this.#rateService = rateService;

    this.getRate = this.getRate.bind(this);
  }

  async getRate(req, res) {
    res.setHeader('content-type', 'application/json');
    try {
      loggerService.logDebug(req);
      const rate = await this.#rateService.getRate();
      return res.status(200).json(rate);
    } catch (err) {
      loggerService.logError(err);
      return res.status(400).send();
    }
  }
}

module.exports = RateController;
