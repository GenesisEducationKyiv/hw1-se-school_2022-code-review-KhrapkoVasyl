'use strict';

class LoggerService {
  #messageBrokerService;
  constructor(messageBrokerService) {
    this.#messageBrokerService = messageBrokerService;

    this.logError = this.logError.bind(this);
  }

  async logInfo() {
    await this.#messageBrokerService.consume('info', console.info);
  }

  logDebug() {
    this.#messageBrokerService.consume('debug', console.debug);
  }

  logError() {
    this.#messageBrokerService.consume('error', console.error);
  }
}

module.exports = LoggerService;
