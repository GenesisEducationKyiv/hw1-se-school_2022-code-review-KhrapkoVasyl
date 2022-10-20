'use strict';

const LoggerService = require('./logger.service');
const { messageBrokerService } = require('../../broker');

const loggerService = new LoggerService(messageBrokerService);

module.exports = {
  loggerService,
};
