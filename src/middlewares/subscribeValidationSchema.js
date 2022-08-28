'use strict';

const { body } = require('express-validator');

const subscribeValidationSchema = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Incorrect email address specified'),
];

module.exports = subscribeValidationSchema;
