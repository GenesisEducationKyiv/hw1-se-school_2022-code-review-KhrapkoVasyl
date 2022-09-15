'use strict';

class NotificationsService {
  #emailsRepository;
  #emailsService;
  #rateService;

  constructor(emailsRepository, emailsService, rateService) {
    this.#emailsRepository = emailsRepository;
    this.#emailsService = emailsService;
    this.#rateService = rateService;

    this.notifySubscribers = this.notifySubscribers.bind(this);

    this.subject = 'BTC to UAH exchange rate';
    this.text = 'Current BTC to UAH exchange rate: $[RATE]';
  }
  async notifySubscribers() {
    try {
      const currentRate = await this.#rateService.getRate();
      const mailReceivers = await this.#emailsRepository.findAllEmails();
      const textWithRate = this.text.replaceAll('$[RATE]', currentRate);
      return await this.#emailsService.sendEmails(
        mailReceivers,
        this.subject,
        textWithRate
      );
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = NotificationsService;
