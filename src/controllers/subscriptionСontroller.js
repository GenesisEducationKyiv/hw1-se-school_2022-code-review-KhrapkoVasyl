'use strict';

const subscriptionService = require('../services/subscriptionService');
const notificationService = require('../services/notificationService');

module.exports.subscribe = async (req, res) => {
  res.setHeader('content-type', 'application/json');
  const email = req.body.email;

  try {
    const isSubscribed = await subscriptionService.isSubscribed(email);
    if (isSubscribed) return res.status(409).send();

    await subscriptionService.subscribe(email);
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

module.exports.sendEmails = async (req, res) => {
  res.setHeader('content-type', 'application/json');
  const emailAddressesNotSentTo = await notificationService.notifySubscribers();
  return res.status(200).json({ notSentToEmails: emailAddressesNotSentTo });
};
