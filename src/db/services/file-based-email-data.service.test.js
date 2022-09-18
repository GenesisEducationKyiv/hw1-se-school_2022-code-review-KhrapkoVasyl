/* eslint-disable max-len */
'use strict';

const path = require('path');
const fsp = require('fs').promises;
const FileBasedEmailDataService = require('./file-based-email-data.service');

describe('File Based Email Repository Testing', () => {
  const dirPath = path.join(__dirname, '..', 'testData');
  const emailsFilePath = path.join(dirPath, 'emails.txt');
  const fileBasedEmailService = new FileBasedEmailDataService(dirPath);

  beforeEach(async () => {
    await fileBasedEmailService.connect();
  });

  afterEach(async () => {
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

  describe('Testing the .saveEmails() method', () => {
    test('Should add a string of 3 emails separated by a line break to the file with emails', async () => {
      const email1 = 'email1@e.mail';
      const email2 = 'email2@e.mail';
      const email3 = 'email3@e.mail';

      await fileBasedEmailService.saveEmails([email1, email2, email3]);

      const dataInEmailsFile = await fsp.readFile(emailsFilePath, {
        encoding: 'utf-8',
      });

      expect(dataInEmailsFile).toBe(`${email1}\n${email2}\n${email3}\n`);
    });
  });

  describe('Testing the .appendEmail() method', () => {
    test('Should add a string of one email to the file with emails', async () => {
      await fileBasedEmailService.appendEmail('test@e.mail');

      const dataInEmailsFile = await fsp.readFile(emailsFilePath, {
        encoding: 'utf-8',
      });
      expect(dataInEmailsFile).toBe('test@e.mail\n');
    });
  });

  test('Should add a string of one email to the end of the file with 3 prepopulated emails', async () => {
    const email1 = 'email1@e.mail';
    const email2 = 'email2@e.mail';
    const email3 = 'email3@e.mail';
    const emailToAppend = 'email@e.mail';
    await fileBasedEmailService.saveEmails([email1, email2, email3]);

    await fileBasedEmailService.appendEmail(emailToAppend);

    const dataInEmailsFile = await fsp.readFile(emailsFilePath, {
      encoding: 'utf-8',
    });
    expect(dataInEmailsFile).toBe(
      `${email1}\n${email2}\n${email3}\n${emailToAppend}\n`
    );
  });
});
