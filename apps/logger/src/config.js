'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8079;
const HOST = process.env.HOST || '0.0.0.0';
const AMQP_URL = process.env.AMQP_URL || 'amqp://0.0.0.0:5672';

module.exports = {
  PORT,
  HOST,
  AMQP_URL,
};
