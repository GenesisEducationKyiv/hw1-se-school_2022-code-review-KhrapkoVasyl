'use strict';

require('dotenv').config();
const fsp = require('fs').promises;
const path = require('path');
const { ERR_CODE_NO_SUCH_FILE } = require('../../config');
const EmailRepository = require('./email.repository');

class FileBasedEmailRepository extends EmailRepository {
  #emailsFilename = process.env.EMAILS_FILENAME || 'emails.txt';
  #dataDirectory;
  #pathToEmailsFile;

  #emails = [];

  constructor(dataDirectory = path.join(__dirname, '..', 'emailData')) {
    super();
    this.#dataDirectory = dataDirectory;

    this.#pathToEmailsFile = path.join(
      this.#dataDirectory,
      this.#emailsFilename
    );

    this.connect = this.connect.bind(this);
    this.deleteAllEmails = this.deleteAllEmails.bind(this);
    this.findAllEmails = this.findAllEmails.bind(this);
    this.insertEmail = this.insertEmail.bind(this);
    this.isEmailExists = this.isEmailExists.bind(this);
  }

  async connect() {
    await fsp.mkdir(path.join(this.#dataDirectory), {
      recursive: true,
    });

    await this.#createFileIfNotExist();

    const emailsStr = await fsp.readFile(this.#pathToEmailsFile, {
      encoding: 'utf-8',
    });
    if (emailsStr) this.#emails = emailsStr.trim().split('\n');
  }

  async #createFileIfNotExist() {
    await fsp.access(this.#pathToEmailsFile).catch(async err => {
      if (err.code === ERR_CODE_NO_SUCH_FILE) {
        await this.#saveEmailsToFile();
      } else {
        throw err;
      }
    });
  }

  async #saveEmailsToFile() {
    const emailsStr = this.#emails.join('\n').trim();
    await fsp.writeFile(this.#pathToEmailsFile, emailsStr);
  }

  async deleteAllEmails() {
    this.#emails = [];
    await this.#saveEmailsToFile();
  }

  async findAllEmails() {
    return this.#emails.slice();
  }

  async insertEmail(email) {
    this.#emails.push(email);
    await fsp.appendFile(this.#pathToEmailsFile, email + '\n');
    return email;
  }

  isEmailExists(email) {
    return this.#emails.includes(email);
  }
}

module.exports = FileBasedEmailRepository;
