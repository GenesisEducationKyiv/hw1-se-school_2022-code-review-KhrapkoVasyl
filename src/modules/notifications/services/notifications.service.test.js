/* eslint-disable max-len */
'use strict';

require('dotenv').config();
const NotificationsService = require('./notifications.service');
const { emailsRepository } = require('../../../db');
const { emailsService } = require('../../emails');
const { rateService } = require('../../rate');

const mockRate = 50000;
const rateServiceMock = {
  callesCounter: 0,
  async getRate() {
    this.callesCounter++;
    return mockRate;
  },
};

const emailsRepositoryMock = {
  callesCounter: 0,
  async findAllEmails() {
    this.callesCounter++;
    return ['email1', 'email2', 'email3'];
  },
};

const emailsServiceMock = {
  callesCounter: 0,
  async sendEmails() {
    this.callesCounter++;
    return [];
  },
};

describe('NotificationsService.notifySubscribers() testing', () => {
  describe('NotificationsService.notifySubscribers() unit test', () => {
    test('Should not throw an error and each mock function should be called once', async () => {
      const notificationsService = new NotificationsService(
        emailsRepositoryMock,
        emailsServiceMock,
        rateServiceMock
      );

      try {
        const emailAddressesNotSentTo =
          await notificationsService.notifySubscribers();
        expect(emailsRepositoryMock.callesCounter).toBe(1);
        expect(emailsServiceMock.callesCounter).toBe(1);
        expect(rateServiceMock.callesCounter).toBe(1);
        expect(Array.isArray(emailAddressesNotSentTo)).toBe(true);
        expect(emailAddressesNotSentTo).toHaveLength(0);
      } catch (err) {
        expect(err).toBe(undefined);
      }
    });
  });

  describe('NotificationsService.notifySubscribers() integration test', () => {
    test('Should not throw an error and returned value must be an empty array', async () => {
      const notificationsService = new NotificationsService(
        emailsRepository,
        emailsService,
        rateService
      );

      try {
        const emailAddressesNotSentTo =
          await notificationsService.notifySubscribers();
        expect(Array.isArray(emailAddressesNotSentTo)).toBe(true);
        expect(emailAddressesNotSentTo).toHaveLength(0);
      } catch (err) {
        expect(err).toBe(undefined);
      }
    });
  });
});
