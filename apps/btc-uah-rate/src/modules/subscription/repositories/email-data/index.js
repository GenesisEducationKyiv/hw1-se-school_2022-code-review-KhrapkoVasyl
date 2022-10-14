'use strict';

const FileBasedEmailRepository = require('./fileBasedEmail.repository');
const { emailDataService } = require('../../services/email-data');

const emailRepository = new FileBasedEmailRepository(emailDataService);

module.exports = { emailRepository };
