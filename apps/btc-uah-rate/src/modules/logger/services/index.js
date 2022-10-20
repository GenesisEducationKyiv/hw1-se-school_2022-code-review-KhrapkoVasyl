'use strict';

const LoggerUsingBrokerService = require('./logger-using-broker.service');
const { messageBrokerService } = require('../../broker');

const loggerService = new LoggerUsingBrokerService(messageBrokerService);

module.exports = {
  loggerService,
};
