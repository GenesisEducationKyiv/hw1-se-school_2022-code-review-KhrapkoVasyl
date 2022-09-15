/* eslint-disable max-len */
'use strict';

const path = require('path');
const fsp = require('fs').promises;
const FileBasedEmailsRepository = require('./fileBasedEmails.repository');

describe('File Based Emails Repository Testing', () => {
  const dirPath = path.join(__dirname, 'testData');
  const emailsFilePath = path.join(dirPath, 'emails.txt');
  const fileBasedEmailsRepository = new FileBasedEmailsRepository(dirPath);

  beforeEach(async () => {
    await fileBasedEmailsRepository.connect();
  });

  afterEach(async () => {
    await fileBasedEmailsRepository.clearDB();
    await fsp
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  describe('Testing the .connect() method', () => {
    // The .connect() method creates
    // a directory at the specified path (and database files in this directory).
    // We don't call it directly in the test
    // because this method is called before every test.

    test('Should create directory ./test and not throw an error when trying to access this folder', async () => {
      const testFolderAccess = async () => await fsp.access(dirPath);

      expect(testFolderAccess).not.toThrow();
    });

    test('Should create datafile ./test/emails.txt and not throw an error when trying to access this datafile', async () => {
      const testFileAccess = async () => await fsp.access(emailsFilePath);

      expect(testFileAccess).not.toThrow();
    });
  });

  describe('Testing the .insertEmail() method', () => {
    test(`Should insert a new email address into the database, the return value should be equal to the email being inserted`, async () => {
      const newEmail = 'test@gmail.com';

      const returnedEmail = await fileBasedEmailsRepository.insertEmail(
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

      const returnedEmail1 = await fileBasedEmailsRepository.insertEmail(
        newEmail1
      );
      const returnedEmail2 = await fileBasedEmailsRepository.insertEmail(
        newEmail2
      );
      const returnedEmail3 = await fileBasedEmailsRepository.insertEmail(
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

  describe('Testing the .isEmailInDB() method', () => {
    test(`Should return true when the email being checked has already been written to the database`, async () => {
      const newEmail = 'test@gmail.com';
      const emailToCheck = newEmail;
      await fileBasedEmailsRepository.insertEmail(newEmail);

      const checkingResult = await fileBasedEmailsRepository.isEmailInDB(
        emailToCheck
      );

      expect(checkingResult).toBe(true);
    });

    test(`Should return false if the email being checked is not in the database`, async () => {
      const emailToCheck = 'test@gmail.com';

      const checkingResult = await fileBasedEmailsRepository.isEmailInDB(
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
      await fileBasedEmailsRepository.insertEmail(emailToAdd1);
      await fileBasedEmailsRepository.insertEmail(emailToAdd2);
      await fileBasedEmailsRepository.insertEmail(emailToAdd3);

      const emailsArr = await fileBasedEmailsRepository.findAllEmails();

      expect(Array.isArray(emailsArr)).toBe(true);
      expect(emailsArr).toHaveLength(3);
      expect(emailsArr).toContain(emailToAdd1);
      expect(emailsArr).toContain(emailToAdd2);
      expect(emailsArr).toContain(emailToAdd3);
    });

    test(`Should return an empty array if no email has been inserted`, async () => {
      const emailsArr = await fileBasedEmailsRepository.findAllEmails();

      expect(Array.isArray(emailsArr)).toBe(true);
      expect(emailsArr).toHaveLength(0);
    });
  });

  describe('Testing the .clearDB() method', () => {
    test(`Should clear all inserted email addresses (array of all email addresses should become empty)`, async () => {
      const emailToAdd1 = 'test1@gmail.com';
      const emailToAdd2 = 'test2@gmail.com';
      const emailToAdd3 = 'test3@gmail.com';
      await fileBasedEmailsRepository.insertEmail(emailToAdd1);
      await fileBasedEmailsRepository.insertEmail(emailToAdd2);
      await fileBasedEmailsRepository.insertEmail(emailToAdd3);

      await fileBasedEmailsRepository.clearDB();

      const emailsArr = await fileBasedEmailsRepository.findAllEmails();
      expect(emailsArr).toHaveLength(0);
    });

    test(`Should not throw an error when trying to clear an empty array`, async () => {
      try {
        await fileBasedEmailsRepository.clearDB();

        const emailsArr = await fileBasedEmailsRepository.findAllEmails();
        expect(emailsArr).toHaveLength(0);
      } catch (err) {
        expect(err).toBe(undefined);
      }
    });
  });
});
