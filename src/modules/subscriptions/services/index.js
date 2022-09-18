'use strict';

const { emailRepository } = require('../../../db');
const SubscriptionService = require('./subscription.service');

const subscriptionService = new SubscriptionService(emailRepository);
module.exports = { subscriptionService };
