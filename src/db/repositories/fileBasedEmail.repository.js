'use strict';

const EmailRepository = require('./email.repository');

class FileBasedEmailRepository extends EmailRepository {
  #emails = [];
  #emailService;

  constructor(emailService, emails = []) {
    super();

    this.#emailService = emailService;
    this.#emails = emails;

    this.deleteAllEmails = this.deleteAllEmails.bind(this);
    this.findAllEmails = this.findAllEmails.bind(this);
    this.insertEmail = this.insertEmail.bind(this);
    this.isEmailExists = this.isEmailExists.bind(this);
  }

  async deleteAllEmails() {
    this.#emails = [];
    await this.#emailService.saveEmails(this.#emails);
  }

  async findAllEmails() {
    return this.#emails.slice();
  }

  async insertEmail(email) {
    this.#emails.push(email);
    await this.#emailService.appendEmail(email);
    return email;
  }

  isEmailExists(email) {
    return this.#emails.includes(email);
  }
}

module.exports = FileBasedEmailRepository;
