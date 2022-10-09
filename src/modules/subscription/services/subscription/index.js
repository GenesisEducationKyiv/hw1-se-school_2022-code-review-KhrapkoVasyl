'use strict';

const { emailRepository } = require('../../repositories');
const SubscriptionService = require('./subscription.service');

const subscriptionService = new SubscriptionService(emailRepository);
module.exports = { subscriptionService };
