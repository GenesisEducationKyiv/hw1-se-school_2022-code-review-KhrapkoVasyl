'use strict';

const { loggerService } = require('../../logger');

class NotificationController {
  #notificationService;

  constructor(notificationService) {
    this.#notificationService = notificationService;

    this.notifySubscribers = this.notifySubscribers.bind(this);
  }

  async notifySubscribers(req, res) {
    res.setHeader('content-type', 'application/json');
    loggerService.logDebug(req);
    const emailAddressesNotSentTo =
      await this.#notificationService.notifySubscribers();
    return res.status(200).json({ emailAddressesNotSentTo });
  }
}

module.exports = NotificationController;
