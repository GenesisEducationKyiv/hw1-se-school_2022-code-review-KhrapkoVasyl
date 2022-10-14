'use strict';

const { loggerService } = require('../../logger');

class SubscriptionController {
  #subscriptionService;
  constructor(subscriptionService) {
    this.#subscriptionService = subscriptionService;

    this.subscribe = this.subscribe.bind(this);
  }

  async subscribe(req, res) {
    res.setHeader('content-type', 'application/json');
    loggerService.logDebug(req);
    const email = req.body.email;

    try {
      const isSubscribed = this.#subscriptionService.isSubscribed(email);
      if (isSubscribed) {
        loggerService.logError(new Error('Message already exists'));
        return res.status(409).send();
      }

      await this.#subscriptionService.subscribe(email);
      return res.status(200).send();
    } catch (err) {
      loggerService.logError(err);
      return res.status(500).send();
    }
  }
}

module.exports = SubscriptionController;
