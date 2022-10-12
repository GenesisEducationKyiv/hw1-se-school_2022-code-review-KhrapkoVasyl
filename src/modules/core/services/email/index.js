'use strict';

const EmailService = require('./email.service');
// eslint-disable-next-line max-len
const { emailSender } = require('./senders');

const emailService = new EmailService(emailSender);

module.exports = { emailService };
