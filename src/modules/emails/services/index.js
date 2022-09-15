'use strict';

const EmailsService = require('./emails.service');
// eslint-disable-next-line max-len
const GmailNodemailerEmailsSender = require('./senders/gmail-nodemailer-emails.sender');

const gmailNodemailerEmailsSender = new GmailNodemailerEmailsSender();
const emailsService = new EmailsService(gmailNodemailerEmailsSender);

module.exports = { emailsService };
