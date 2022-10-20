'use strict';

const RateController = require('./rate.controller');
const { rateService } = require('./services');

const rateController = new RateController(rateService);

module.exports = { rateController, rateService };
