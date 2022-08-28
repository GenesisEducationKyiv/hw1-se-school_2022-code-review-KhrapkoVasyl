'use strict';

require('dotenv').config();
const app = require('./app');
const db = require('./db/db');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

(async () => {
  await db.connect();
  app.listen(PORT, HOST, () => {
    console.log(`App listening on http://${HOST}:${PORT}`);
  });
})();
