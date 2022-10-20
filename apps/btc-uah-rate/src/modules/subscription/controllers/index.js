'use strict';

const NotificationController = require('./notification.controller');
const SubscriptionController = require('./subscription.controller');

const { notificationService, subscriptionService } = require('../services');

const notificationController = new NotificationController(notificationService);
const subscriptionController = new SubscriptionController(subscriptionService);

module.exports = { subscriptionController, notificationController };
