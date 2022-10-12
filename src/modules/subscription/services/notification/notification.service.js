'use strict';

class NotificationService {
  #emailRepository;
  #emailService;
  #rateService;

  constructor(emailRepository, emailService, rateService) {
    this.#emailRepository = emailRepository;
    this.#emailService = emailService;
    this.#rateService = rateService;

    this.notifySubscribers = this.notifySubscribers.bind(this);

    this.subject = 'BTC to UAH exchange rate';
    this.text = 'Current BTC to UAH exchange rate: $[RATE]';
  }
  async notifySubscribers() {
    try {
      const currentRate = await this.#rateService.getRate();
      const mailReceivers = await this.#emailRepository.findAllEmails();
      const textWithRate = this.text.replaceAll('$[RATE]', currentRate);
      return await this.#emailService.sendEmails(
        mailReceivers,
        this.subject,
        textWithRate
      );
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = NotificationService;
