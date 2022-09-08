'use strict';

class NotificationsController {
  #notificationsService;

  constructor(notificationsService) {
    this.#notificationsService = notificationsService;

    this.notifySubscribers = this.notifySubscribers.bind(this);
  }

  async notifySubscribers(req, res) {
    res.setHeader('content-type', 'application/json');
    const emailAddressesNotSentTo =
      await this.#notificationsService.notifySubscribers();
    return res.status(200).json({ emailAddressesNotSentTo });
  }
}

module.exports = NotificationsController;
