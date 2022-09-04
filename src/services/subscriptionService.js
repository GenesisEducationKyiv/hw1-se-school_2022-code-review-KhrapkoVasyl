'use strict';

const db = require('../db/db');

module.exports.subscribe = email => db.insertEmail(email);

module.exports.isSubscribed = email => db.isEmailInDB(email);
