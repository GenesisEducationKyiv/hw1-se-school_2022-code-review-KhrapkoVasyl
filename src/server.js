'use strict';

const { HOST, PORT } = require('./config');
const { emailDataService, emailRepository } = require('./modules/subscription');
const app = require('./app');

(async () => {
  const emails = await emailDataService.connect();
  await emailRepository.deleteAllEmails();
  for (const email of emails) {
    await emailRepository.insertEmail(email);
  }
  app.listen(PORT, HOST, () => {
    console.log(`App listening on http://${HOST}:${PORT}`);
  });
})();
