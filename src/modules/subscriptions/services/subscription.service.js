'use strict';

class SubscriptionService {
  #emailRepository;
  constructor(emailRepository) {
    this.#emailRepository = emailRepository;
  }
  subscribe(email) {
    return this.#emailRepository.insertEmail(email);
  }

  isSubscribed(email) {
    return this.#emailRepository.isEmailExists(email);
  }
}

module.exports = SubscriptionService;
