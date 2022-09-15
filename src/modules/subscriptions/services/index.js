'use strict';

const { emailsRepository } = require('../../../db');
const SubscriptionsService = require('./subscriptions.service');

const subscriptionsService = new SubscriptionsService(emailsRepository);
module.exports = { subscriptionsService };
