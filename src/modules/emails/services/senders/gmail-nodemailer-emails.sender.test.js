/* eslint-disable max-len */
'use strict';

require('dotenv').config();
const GmailNodemailerEmailsSender = require('./gmail-nodemailer-emails.sender');

const gmailNodemailerEmailsSender = new GmailNodemailerEmailsSender();

describe('EmailsSender testing', () => {
  test('Should not throw an error when sending messages to 3 email addresses and should return an empty array of users who have not been sent a message', async () => {
    const testEmails = [
      'email1@test.com',
      'email2@test.com',
      'email3@test.com',
    ];
    const testSubject = 'testSubject';
    const testText = 'testText';

    try {
      const emailAddressesNotSentTo =
        await gmailNodemailerEmailsSender.sendEmails(
          testEmails,
          testSubject,
          testText
        );

      expect(emailAddressesNotSentTo).not.toBe(undefined);
      expect(Array.isArray(emailAddressesNotSentTo)).toBe(true);
      expect(emailAddressesNotSentTo).toHaveLength(0);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  test('Should not throw an error when sending messages by passing an empty array of email recipients and should return an empty array of users who have not been sent a message', async () => {
    try {
      const emailAddressesNotSentTo =
        await gmailNodemailerEmailsSender.sendEmails(
          [],
          'Test mail subject',
          'Test mail text'
        );

      expect(emailAddressesNotSentTo).not.toBe(undefined);
      expect(Array.isArray(emailAddressesNotSentTo)).toBe(true);
      expect(emailAddressesNotSentTo).toHaveLength(0);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });
});
