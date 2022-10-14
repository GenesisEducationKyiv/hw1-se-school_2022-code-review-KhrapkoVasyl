'use strict';

class LoggerUsingBrokerService {
  #messageBrokerService;
  constructor(messageBrokerService) {
    this.#messageBrokerService = messageBrokerService;
  }
  log(message, queue) {
    const currentDate = new Date().toISOString();
    const logMessage = `[${currentDate}] - ${message}`;
    this.#messageBrokerService.publishUsingDefaultExchange(queue, logMessage);
    // console.log(logMessage);
  }

  logInfo(message) {
    const logMessage = `[Info] - [${message}]`;
    this.log(logMessage, 'info');
  }

  logDebug(req) {
    const method = req?.method || 'NO_METHOD_INFO';
    const url = req?.originalUrl || 'NO_URL_INFO';
    const body = JSON.stringify(req?.body) || 'NO_REQUEST_BODY_INFO';
    const message = `[Method: ${method}] - [URL: ${url}] - [Body: ${body}]`;
    const logMessage = `[Debug] - ${message}`;
    this.log(logMessage, 'debug');
  }

  logError(message) {
    const logMessage = `[Error] - [${message}]`;
    this.log(logMessage, 'error');
  }
}

module.exports = LoggerUsingBrokerService;
