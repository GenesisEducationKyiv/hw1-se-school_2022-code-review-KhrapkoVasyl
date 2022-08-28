'use strict';

require('dotenv').config();
const FileBasedDB = require('./fileBasedDB');

const db = new FileBasedDB();

module.exports = db;
