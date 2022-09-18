'use strict';

const EmailService = require('./email.service');
// eslint-disable-next-line max-len
const GmailNodemailerEmailSender = require('./senders/gmail-nodemailer-email.sender');

const gmailNodemailerEmailSender = new GmailNodemailerEmailSender();
const emailService = new EmailService(gmailNodemailerEmailSender);

module.exports = { emailService };
