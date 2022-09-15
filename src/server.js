'use strict';

require('dotenv').config();
const app = require('./app');
const { emailsRepository } = require('./db');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

(async () => {
  await emailsRepository.connect();
  app.listen(PORT, HOST, () => {
    console.log(`App listening on http://${HOST}:${PORT}`);
  });
})();
