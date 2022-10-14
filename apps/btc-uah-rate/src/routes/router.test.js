/* eslint-disable max-len */
'use strict';

const request = require('supertest');
const app = require('../app');

describe('Test GET /api/rate', () => {
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/rate');

    expect(response.statusCode).toBe(200);
  });

  test('Should specify JSON as the content type in the http header', async () => {
    const response = await request(app).get('/api/rate');

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });
  test('Response should have body, whose type should be positive integer', async () => {
    const response = await request(app).get('/api/rate');

    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
    expect(Number.isInteger(response.body)).toBe(true);
    expect(response.body).toBeGreaterThan(0);
  });
});

describe('Test POST /api/subscribe', () => {
  test('Should respond with a 400 status code when not sent email address for subscription', async () => {
    const response = await request(app).post('/api/subscribe');

    expect(response.statusCode).toBe(400);
  });

  test('Should respond with a 400 status code when sent not valid email address', async () => {
    const response = await request(app)
      .post('/api/subscribe')
      .send({ email: 'incorrect-email' });

    expect(response.statusCode).toBe(400);
  });

  test('Should respond with a 409 status code when sending email has already been subscribed', async () => {
    await request(app).post('/api/subscribe').send({ email: 'test@gmail.com' });

    const secondResponse = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@gmail.com' });

    expect(secondResponse.statusCode).toBe(409);
  });

  test('Should respond with a 200 status code when sending email is valid ', async () => {
    const response = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test1@gmail.com' });

    expect(response.statusCode).toBe(200);
  });

  test('Should specify JSON as the content type in the http header when sending email is valid', async () => {
    const response = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test2@gmail.com' });

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });
});

describe('Test POST /api/sendEmails', () => {
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).post('/api/sendEmails');

    expect(response.statusCode).toBe(200);
  });

  test('Should specify JSON as the content type in the http header', async () => {
    const response = await request(app).post('/api/sendEmails');

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });
});
