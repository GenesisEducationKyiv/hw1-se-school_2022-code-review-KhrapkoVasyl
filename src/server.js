'use strict';

const { HOST, PORT } = require('./config');
const { emailService, emailRepository } = require('./db');
const app = require('./app');

(async () => {
  const emails = await emailService.connect();
  await emailRepository.deleteAllEmails();
  for (const email of emails) {
    await emailRepository.insertEmail(email);
  }
  app.listen(PORT, HOST, () => {
    console.log(`App listening on http://${HOST}:${PORT}`);
  });
})();
