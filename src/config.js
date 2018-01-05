const jsonfile = require('jsonfile');
const { keyFilePath } = require('./constants');

const config = jsonfile.readFileSync(keyFilePath);
module.exports = config;
