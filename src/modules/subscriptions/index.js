'use strict';

const { subscriptionsService } = require('./services');
const SubscriptionsController = require('./subscriptions.controller');

const subscriptionsController = new SubscriptionsController(
  subscriptionsService
);

module.exports = { subscriptionsController, subscriptionsService };
