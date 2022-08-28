'use strict';

const PREFIX = '/api';
const URL_API_BTC_TO_UAH_RATE =
  'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';
const ERR_CODE_NO_SUCH_FILE = 'ENOENT';

module.exports = {
  URL_API_BTC_TO_UAH_RATE,
  PREFIX,
  ERR_CODE_NO_SUCH_FILE,
};
