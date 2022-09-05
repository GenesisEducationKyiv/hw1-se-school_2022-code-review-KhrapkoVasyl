/* eslint-disable max-len */
'use strict';

const path = require('path');
const fsp = require('fs').promises;

const db = require('../../db/db');
const subscriptionService = require('../subscriptionService');
const emailSendingService = require('../emailSendingService');

const dirPath = path.join(__dirname, 'testData');

beforeEach(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDB();
  await fsp
    .rm(dirPath, { recursive: true, force: true })
    .catch(err => console.log(err));
});

describe('getRemailSendingService testing', () => {
  test('Should not throw an error when sending messages to 3 email addresses and should return an empty array of users who have not been sent a message', async () => {
    const testEmail1 = await subscriptionService.subscribe('test1@gmail.com');
    const testEmail2 = await subscriptionService.subscribe('test2@gmail.com');
    const testEmail3 = await subscriptionService.subscribe('test3@gmail.com');

    try {
      const emailsNotSentTo = await emailSendingService.sendEmails(
        [testEmail1, testEmail2, testEmail3],
        'Test mail',
        'Test mail'
      );

      expect(emailsNotSentTo).not.toBe(undefined);
      expect(Array.isArray(emailsNotSentTo)).toBe(true);
      expect(emailsNotSentTo).toHaveLength(0);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  test('Should not throw an error when sending messages by passing an empty array of email recipients and should return an empty array of users who have not been sent a message', async () => {
    try {
      const emailsNotSentTo = await emailSendingService.sendEmails(
        [],
        'Test mail',
        'Test mail'
      );

      expect(emailsNotSentTo).not.toBe(undefined);
      expect(Array.isArray(emailsNotSentTo)).toBe(true);
      expect(emailsNotSentTo).toHaveLength(0);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
