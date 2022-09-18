/* eslint-disable max-len */
'use strict';

require('dotenv').config();
const NotificationService = require('./notification.service');
const { emailRepository } = require('../../../db');
const { emailService } = require('../../emails');
const { rateService } = require('../../rate');

const mockRate = 50000;
const rateServiceMock = {
  callesCounter: 0,
  async getRate() {
    this.callesCounter++;
    return mockRate;
  },
};

const emailRepositoryMock = {
  callesCounter: 0,
  async findAllEmails() {
    this.callesCounter++;
    return ['email1', 'email2', 'email3'];
  },
};

const emailServiceMock = {
  callesCounter: 0,
  async sendEmails() {
    this.callesCounter++;
    return [];
  },
};

describe('NotificationService.notifySubscribers() testing', () => {
  describe('NotificationService.notifySubscribers() unit test', () => {
    test('Should not throw an error and each mock function should be called once', async () => {
      const notificationService = new NotificationService(
        emailRepositoryMock,
        emailServiceMock,
        rateServiceMock
      );

      try {
        const emailAddressesNotSentTo =
          await notificationService.notifySubscribers();
        expect(emailRepositoryMock.callesCounter).toBe(1);
        expect(emailServiceMock.callesCounter).toBe(1);
        expect(rateServiceMock.callesCounter).toBe(1);
        expect(Array.isArray(emailAddressesNotSentTo)).toBe(true);
        expect(emailAddressesNotSentTo).toHaveLength(0);
      } catch (err) {
        expect(err).toBe(undefined);
      }
    });
  });

  describe('NotificationService.notifySubscribers() integration test', () => {
    test('Should not throw an error and returned value must be an empty array', async () => {
      const notificationService = new NotificationService(
        emailRepository,
        emailService,
        rateService
      );

      try {
        const emailAddressesNotSentTo =
          await notificationService.notifySubscribers();
        expect(Array.isArray(emailAddressesNotSentTo)).toBe(true);
        expect(emailAddressesNotSentTo).toHaveLength(0);
      } catch (err) {
        expect(err).toBe(undefined);
      }
    });
  });
});
