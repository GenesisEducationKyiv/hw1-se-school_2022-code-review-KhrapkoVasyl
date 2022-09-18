'use strict';

const { subscriptionService } = require('./services');
const SubscriptionController = require('./subscription.controller');

const subscriptionController = new SubscriptionController(subscriptionService);

module.exports = {
  subscriptionController,
  subscriptionService,
};
