'use strict';

const {
  subscriptionController,
  notificationController,
} = require('./controllers');
const {
  subscriptionService,
  notificationService,
  emailDataService,
} = require('./services');
const { subscribeValidationSchema } = require('./middlewares');
const { emailRepository } = require('./repositories');

module.exports = {
  subscriptionController,
  notificationController,
  subscriptionService,
  notificationService,
  emailDataService,
  emailRepository,
  subscribeValidationSchema,
};
