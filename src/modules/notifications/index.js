'use strict';

const { notificationsService } = require('./services');
const NotificationsController = require('./notifications.controller');

const notificationsController = new NotificationsController(
  notificationsService
);

module.exports = { notificationsController, notificationsService };
