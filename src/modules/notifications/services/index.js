'use strict';

const { emailsRepository } = require('../../../db');
const { emailsService } = require('../../emails');
const { rateService } = require('../../rate');
const NotificationsService = require('./notifications.service');

const notificationsService = new NotificationsService(
  emailsRepository,
  emailsService,
  rateService
);
module.exports = { notificationsService };
