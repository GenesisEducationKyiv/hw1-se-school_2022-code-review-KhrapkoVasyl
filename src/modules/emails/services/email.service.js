'use strict';

class EmailService {
  #emailSender;
  constructor(emailSender) {
    this.#emailSender = emailSender;

    this.sendEmails = this.sendEmails.bind(this);
  }

  async sendEmails(mailReceivers, subject, text) {
    return this.#emailSender.sendEmails(mailReceivers, subject, text);
  }
}

module.exports = EmailService;
