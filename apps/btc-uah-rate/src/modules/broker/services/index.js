'use strict';

const RabbitMQMessageBrokerService = require('./rabbitmq-brocker.service');

const messageBrokerService = new RabbitMQMessageBrokerService();

module.exports = { messageBrokerService };
