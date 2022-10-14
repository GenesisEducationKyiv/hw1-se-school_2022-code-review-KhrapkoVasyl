'use strict';

const FileBasedEmailDataService = require('./file-based-email-data.service');

const emailDataService = new FileBasedEmailDataService();

module.exports = { emailDataService };
