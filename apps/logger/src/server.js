'use strict';

const { loggerService } = require('./modules/logger');

const { HOST, PORT } = require('./config');
const app = require('./app');

app.listen(PORT, HOST, () => {
  console.log(`App listening on http://${HOST}:${PORT}`);
});
loggerService.logError();
