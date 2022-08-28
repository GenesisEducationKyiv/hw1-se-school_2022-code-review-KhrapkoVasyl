'use strict';

const db = require('../db/db');

module.exports.subscribe = async email => await db.insertEmail(email);

module.exports.isSubscribed = async email => await db.isEmailInDB(email);
