'use strict';

const { rateProviderCreator } = require('./provider-creators');
const RateService = require('./rate.service');

const rateService = new RateService(rateProviderCreator.createRateProvider());

module.exports = { rateService };
