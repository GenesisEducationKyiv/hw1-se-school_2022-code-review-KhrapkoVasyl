'use strict';

const { emailRepository } = require('../../repositories');
const { emailService } = require('../../../core');
const { rateService } = require('../../../rate');
const NotificationService = require('./notification.service');

const notificationService = new NotificationService(
  emailRepository,
  emailService,
  rateService
);
module.exports = { notificationService };
