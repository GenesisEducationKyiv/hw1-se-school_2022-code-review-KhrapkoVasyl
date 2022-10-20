'use strict';

const { rateProvider } = require('./providers');

const RateService = require('./rate.service');

const rateService = new RateService(rateProvider);

module.exports = { rateService };
