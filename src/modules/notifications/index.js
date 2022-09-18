'use strict';

const { notificationService } = require('./services');
const NotificationController = require('./notification.controller');

const notificationController = new NotificationController(notificationService);

module.exports = {
  notificationController,
  notificationService,
};
