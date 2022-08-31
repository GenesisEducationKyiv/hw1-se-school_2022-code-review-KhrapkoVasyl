'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { PREFIX, SWAGGER_OPTIONS } = require('./config');
const router = require('./routes/router');

const specs = swaggerJsDoc(SWAGGER_OPTIONS);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());

app.use(PREFIX, router);

app.use(PREFIX + '/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
