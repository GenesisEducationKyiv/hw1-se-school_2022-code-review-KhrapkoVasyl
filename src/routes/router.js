'use strict';

const express = require('express');

const rateController = require('../controllers/rateController');
const subscriptionController = require('../controllers/subscriptionСontroller');
const validateRequest = require('../middlewares/validateRequest');
// eslint-disable-next-line max-len
const subscribeValidationSchema = require('../middlewares/subscribeValidationSchema');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: rate
 *     description: Get the current BTC to UAH exchange rate
 *   - name: subscription
 *     description: Working with a subscription
 */

router.route('/rate').get(rateController.getRate);

/**
 * @swagger
 * /rate:
 *   get:
 *     summary: Get the current BTC to UAH exchange rate
 *     description: The query returns the current BTC to UAH rate using Binance's public API.
 *     tags: [rate]
 *     responses:
 *       200:
 *         description: Returns the current BTC to UAH exchange rate
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 87743
 *       400:
 *         description: Invalid status value
 */

router
  .route('/subscribe')
  .post(
    subscribeValidationSchema,
    validateRequest,
    subscriptionController.subscribe
  );

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe email to receive the current exchange rate
 *     description: The query checks whether the given email address is not in the current database and if it is not, records it.
 *     tags: [subscription]
 *     requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: example@gmail.com
 *            required:
 *              - email
 *     responses:
 *       200:
 *         description: Email added
 *       400:
 *         description: The specified email is not valid
 *       409:
 *         description: The specified email has already been subscribed
 *       500:
 *         description: Internal server error
 */

router.route('/sendEmails').post(subscriptionController.sendEmails);

/**
 * @swagger
 * /sendEmails:
 *   post:
 *     summary: Send an email with the current exchange rate to all subscribed email address
 *     description: The request receive the current BTC to UAH rate using Binance's public API and send it to all email addresses that were previously signed.
 *     tags: [subscription]
 *     responses:
 *       200:
 *         description: Notifies that emails are sent. Returns a JSON array containing the list of email addresses to which the email was not sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                notSentToEmails:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example: ["unsent", "emails", "array"]
 */

module.exports = router;
