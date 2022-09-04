'use strict';

const db = require('../db/db');
const getRateService = require('./getRateService');
const emailSendingService = require('./emailSendingService');

module.exports.notifySubscribers = async () => {
  try {
    const currentRate = await getRateService();
    const mailReceivers = await db.findAllEmails();
    return await emailSendingService.sendEmails(
      mailReceivers,
      'BTC to UAH exchange rate',
      `Current BTC to UAH exchange rate: ${currentRate}`
    );
  } catch (err) {
    console.log(err);
  }
};
