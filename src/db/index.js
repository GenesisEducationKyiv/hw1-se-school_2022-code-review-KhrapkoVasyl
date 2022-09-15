'use strict';

// eslint-disable-next-line max-len
const FileBasedEmailsRepository = require('./repositories/fileBasedEmails.repository');

const emailsRepository = new FileBasedEmailsRepository();

module.exports = { emailsRepository };
