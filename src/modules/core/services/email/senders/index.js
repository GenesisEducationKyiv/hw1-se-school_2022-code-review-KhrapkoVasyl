'use strict';

// eslint-disable-next-line max-len
const GmailNodemailerEmailSender = require('./gmail-nodemailer-email.sender');

const emailSender = new GmailNodemailerEmailSender();

module.exports = { emailSender };
