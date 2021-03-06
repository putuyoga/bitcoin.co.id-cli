const request = require('async-request');
const { http_build_query } = require('qhttp');
const crypto = require('crypto');

const { apiUrl } = require('./constants');
const { apiKey, privateKey } = require('./config');

const createQuery = (method) => ({
  method,
  nonce: Date.now()
});

const createHash = (query) => {
  const postData = http_build_query(query);
  const hmac = crypto.createHmac('sha512', privateKey);
  hmac.update(postData);
  return hmac.digest('hex');
}

const createOptions = (query) => ({
  method: 'POST',
  headers: {
    Key: apiKey,
    Sign: createHash(query)
  },
  data: query
});

const get = async(method, path) => {
  const query = createQuery(method);
  const options = createOptions(query); 

  const result = await request(apiUrl, options);
  const { statusCode, body } = result;
  const jsonResponse = JSON.parse(body);

  if(statusCode === 200 && jsonResponse.success !== 0)
    return jsonResponse.return[path];
  throw jsonResponse.error;
}

const getTradeHistory = async () => (
  await get('tradeHistory', 'trades')
);

const getBalance = async () => (
  await get('getInfo', 'balance')
);

module.exports = {
  getTradeHistory,
  getBalance
};
