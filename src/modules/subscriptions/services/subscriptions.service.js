'use strict';

class SubscriptionsService {
  #emailsRepository;
  constructor(emailsRepository) {
    this.#emailsRepository = emailsRepository;
  }
  subscribe(email) {
    return this.#emailsRepository.insertEmail(email);
  }

  isSubscribed(email) {
    return this.#emailsRepository.isEmailInDB(email);
  }
}

module.exports = SubscriptionsService;
