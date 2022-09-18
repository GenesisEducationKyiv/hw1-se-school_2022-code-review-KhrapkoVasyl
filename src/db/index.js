'use strict';

// eslint-disable-next-line max-len
const FileBasedEmailRepository = require('./repositories/fileBasedEmail.repository');

const emailRepository = new FileBasedEmailRepository();

module.exports = { emailRepository };
