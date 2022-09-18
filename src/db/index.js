'use strict';

const FileBasedEmailService = require('./services/file-based-email-data.service');
// eslint-disable-next-line max-len
const FileBasedEmailRepository = require('./repositories/fileBasedEmail.repository');

const emailService = new FileBasedEmailService();

const emailRepository = new FileBasedEmailRepository(emailService);

module.exports = { emailService, emailRepository };
