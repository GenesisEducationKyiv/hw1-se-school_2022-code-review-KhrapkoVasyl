/* eslint-disable max-len */
'use strict';

const path = require('path');
const FileBasedEmailDataService = require('../services/file-based-email-data.service');
const fsp = require('fs').promises;
const FileBasedEmailRepository = require('./fileBasedEmail.repository');

describe('File Based Email Repository Testing', () => {
  const dirPath = path.join(__dirname, '..', 'testData');
  const emailsFilePath = path.join(dirPath, 'emails.txt');

  const fileBasedEmailDataService = new FileBasedEmailDataService(dirPath);
  const fileBasedEmailRepository = new FileBasedEmailRepository(
    fileBasedEmailDataService,
    []
  );

  beforeEach(async () => {
    await fileBasedEmailDataService.connect();
  });

  afterEach(async () => {
    await fileBasedEmailRepository.deleteAllEmails();
    await fsp
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  describe('Testing the .insertEmail() method', () => {
    test(`Should insert a new email address into the database, the return value should be equal to the email being inserted`, async () => {
      const newEmail = 'test@gmail.com';

      const returnedEmail = await fileBasedEmailRepository.insertEmail(
        newEmail
      );

      const dataInEmailsFile = await fsp.readFile(emailsFilePath, {
        encoding: 'utf-8',
      });
      const emailsArr = dataInEmailsFile.trim().split('\n');
      const insertedEmail = emailsArr[0];

      expect(returnedEmail).toBe(newEmail);
      expect(insertedEmail).toBe(newEmail);
      expect(emailsArr).toHaveLength(1);
    });

    test('Should successfully add three emails to the database', async () => {
      const newEmail1 = 'test1@gmail.com';
      const newEmail2 = 'test2@gmail.com';
      const newEmail3 = 'test3@gmail.com';

      const returnedEmail1 = await fileBasedEmailRepository.insertEmail(
        newEmail1
      );
      const returnedEmail2 = await fileBasedEmailRepository.insertEmail(
        newEmail2
      );
      const returnedEmail3 = await fileBasedEmailRepository.insertEmail(
        newEmail3
      );

      const dataInEmailsFile = await fsp.readFile(emailsFilePath, {
        encoding: 'utf-8',
      });
      const emailsArr = dataInEmailsFile.trim().split('\n');

      expect(returnedEmail1).toBe(newEmail1);
      expect(returnedEmail2).toBe(newEmail2);
      expect(returnedEmail3).toBe(newEmail3);
      expect(emailsArr).toHaveLength(3);
      expect(emailsArr).toContain(newEmail1);
      expect(emailsArr).toContain(newEmail2);
      expect(emailsArr).toContain(newEmail3);
    });
  });

  describe('Testing the .isEmailExists() method', () => {
    test(`Should return true when the email being checked has already been written to the database`, async () => {
      const newEmail = 'test@gmail.com';
      const emailToCheck = newEmail;
      await fileBasedEmailRepository.insertEmail(newEmail);

      const checkingResult = await fileBasedEmailRepository.isEmailExists(
        emailToCheck
      );

      expect(checkingResult).toBe(true);
    });

    test(`Should return false if the email being checked is not in the database`, async () => {
      const emailToCheck = 'test@gmail.com';

      const checkingResult = await fileBasedEmailRepository.isEmailExists(
        emailToCheck
      );

      expect(checkingResult).toBe(false);
    });
  });

  describe('Testing the .findAllEmails() method', () => {
    test(`Should return an array containing the 3 emails added earlier to the database`, async () => {
      const emailToAdd1 = 'test1@gmail.com';
      const emailToAdd2 = 'test2@gmail.com';
      const emailToAdd3 = 'test3@gmail.com';
      await fileBasedEmailRepository.insertEmail(emailToAdd1);
      await fileBasedEmailRepository.insertEmail(emailToAdd2);
      await fileBasedEmailRepository.insertEmail(emailToAdd3);

      const emailsArr = await fileBasedEmailRepository.findAllEmails();

      expect(Array.isArray(emailsArr)).toBe(true);
      expect(emailsArr).toHaveLength(3);
      expect(emailsArr).toContain(emailToAdd1);
      expect(emailsArr).toContain(emailToAdd2);
      expect(emailsArr).toContain(emailToAdd3);
    });

    test(`Should return an empty array if no email has been inserted`, async () => {
      const emailsArr = await fileBasedEmailRepository.findAllEmails();

      expect(Array.isArray(emailsArr)).toBe(true);
      expect(emailsArr).toHaveLength(0);
    });
  });

  describe('Testing the .deleteAllEmails() method', () => {
    test(`Should delete all inserted email addresses (array of all email addresses should become empty)`, async () => {
      const emailToAdd1 = 'test1@gmail.com';
      const emailToAdd2 = 'test2@gmail.com';
      const emailToAdd3 = 'test3@gmail.com';
      await fileBasedEmailRepository.insertEmail(emailToAdd1);
      await fileBasedEmailRepository.insertEmail(emailToAdd2);
      await fileBasedEmailRepository.insertEmail(emailToAdd3);

      await fileBasedEmailRepository.deleteAllEmails();

      const emailsArr = await fileBasedEmailRepository.findAllEmails();
      expect(emailsArr).toHaveLength(0);
    });

    test(`Should not throw an error when trying to clear an empty array`, async () => {
      try {
        await fileBasedEmailRepository.deleteAllEmails();

        const emailsArr = await fileBasedEmailRepository.findAllEmails();
        expect(emailsArr).toHaveLength(0);
      } catch (err) {
        expect(err).toBe(undefined);
      }
    });
  });
});
