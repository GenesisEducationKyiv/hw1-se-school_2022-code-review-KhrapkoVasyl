'use strict';

const { emailRepository } = require('../../../db');
const { emailService } = require('../../emails');
const { rateService } = require('../../rate');
const NotificationService = require('./notification.service');

const notificationService = new NotificationService(
  emailRepository,
  emailService,
  rateService
);
module.exports = { notificationService };
