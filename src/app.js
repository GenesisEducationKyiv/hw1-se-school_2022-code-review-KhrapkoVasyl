'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const router = require('./routes/router');

const { PREFIX } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());

app.use(PREFIX, router);

const swaggerOptions = {
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

const specs = swaggerJsDoc(swaggerOptions);

app.use(PREFIX + '/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
