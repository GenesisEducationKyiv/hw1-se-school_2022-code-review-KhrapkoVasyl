'use strict';

class SubscriptionsController {
  #subscriptionsService;
  constructor(subscriptionsService) {
    this.#subscriptionsService = subscriptionsService;

    this.subscribe = this.subscribe.bind(this);
  }

  async subscribe(req, res) {
    res.setHeader('content-type', 'application/json');
    const email = req.body.email;

    try {
      const isSubscribed = this.#subscriptionsService.isSubscribed(email);
      if (isSubscribed) return res.status(409).send();

      await this.#subscriptionsService.subscribe(email);
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
}

module.exports = SubscriptionsController;
