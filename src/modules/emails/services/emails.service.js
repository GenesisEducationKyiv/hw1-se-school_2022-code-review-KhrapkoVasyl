'use strict';

class EmailsService {
  #emailsSender;
  constructor(emailsSender) {
    this.#emailsSender = emailsSender;

    this.sendEmails = this.sendEmails.bind(this);
  }

  async sendEmails(mailReceivers, subject, text) {
    return this.#emailsSender.sendEmails(mailReceivers, subject, text);
  }
}

module.exports = EmailsService;
