'use strict';

require('dotenv').config();
const fsp = require('fs').promises;
const path = require('path');
const { ERR_CODE_NO_SUCH_FILE } = require('../../config');

const EmailDataService = require('./email-data.service');

class FileBasedEmailDataService extends EmailDataService {
  #emailsFilename = process.env.EMAILS_FILENAME || 'emails.txt';
  #dataDirectory;
  #pathToEmailsFile;

  constructor(dataDirectory = path.join(__dirname, '..', 'emailData')) {
    super();
    this.#dataDirectory = dataDirectory;

    this.#pathToEmailsFile = path.join(
      this.#dataDirectory,
      this.#emailsFilename
    );

    this.connect = this.connect.bind(this);
    this.saveEmails = this.saveEmails.bind(this);
    this.appendEmail = this.appendEmail.bind(this);
  }
  async connect() {
    await fsp.mkdir(path.join(this.#dataDirectory), {
      recursive: true,
    });

    await this.#createFileIfNotExist();

    const emailsStr = await fsp.readFile(this.#pathToEmailsFile, {
      encoding: 'utf-8',
    });
    if (emailsStr) return emailsStr.trim().split('\n');
    return [];
  }

  async #createFileIfNotExist() {
    await fsp.access(this.#pathToEmailsFile).catch(async err => {
      if (err.code === ERR_CODE_NO_SUCH_FILE) {
        await this.saveEmails();
      } else {
        throw err;
      }
    });
  }

  async saveEmails(emails = []) {
    const endOfLine = emails.length ? '\n' : '';
    const emailsStr = emails.join('\n').trim() + endOfLine;
    await fsp.writeFile(this.#pathToEmailsFile, emailsStr);
  }
  async appendEmail(email) {
    await fsp.appendFile(this.#pathToEmailsFile, email + '\n');
  }
}

module.exports = FileBasedEmailDataService;
