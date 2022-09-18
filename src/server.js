'use strict';

require('dotenv').config();
const { emailService, emailRepository } = require('./db');
const app = require('./app');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

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
