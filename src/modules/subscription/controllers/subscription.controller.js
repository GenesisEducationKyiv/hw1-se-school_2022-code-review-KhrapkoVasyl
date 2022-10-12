'use strict';

class SubscriptionController {
  #subscriptionService;
  constructor(subscriptionService) {
    this.#subscriptionService = subscriptionService;

    this.subscribe = this.subscribe.bind(this);
  }

  async subscribe(req, res) {
    res.setHeader('content-type', 'application/json');
    const email = req.body.email;

    try {
      const isSubscribed = this.#subscriptionService.isSubscribed(email);
      if (isSubscribed) return res.status(409).send();

      await this.#subscriptionService.subscribe(email);
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
}

module.exports = SubscriptionController;
