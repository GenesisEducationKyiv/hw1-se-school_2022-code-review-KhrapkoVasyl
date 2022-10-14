'use strict';

require('dotenv').config();

const PREFIX = '/api';
const URL_API_BTC_TO_UAH_RATE =
  'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';
const ERR_CODE_NO_SUCH_FILE = 'ENOENT';

const SWAGGER_OPTIONS = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GSES2 btc-uah-rate-api',
      version: '1.0.0',
      description: `Genesis Software Engineering School test task.
        API to track the exchange rate of BTC (bitcoin) to the UAH (hryvnia)`,
      contact: {
        name: 'API Support',
        email: 'khrapko2002@gmail.com',
      },
    },

    servers: [
      {
        url: 'http://127.0.0.1:8080/api',
        basePath: PREFIX,
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const EMAILS_FILENAME = process.env.EMAILS_FILENAME || 'emails.txt';
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || '';
const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:5672';
const CRYPTO_CURRENCY_PROVIDER = process.env.CRYPTO_CURRENCY_PROVIDER || '';

module.exports = {
  URL_API_BTC_TO_UAH_RATE,
  PREFIX,
  ERR_CODE_NO_SUCH_FILE,
  SWAGGER_OPTIONS,
  ...process.env,
  PORT,
  HOST,
  EMAILS_FILENAME,
  COINMARKET_API_KEY,
  CRYPTO_CURRENCY_PROVIDER,
  AMQP_URL,
};
