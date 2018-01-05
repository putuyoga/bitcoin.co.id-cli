const jsonfile = require('jsonfile');
const prompt = require('prompt');
const chalk = require('chalk');

const messages = require('../messages');
const { keyFilePath } = require('../constants');

const promptCallback = (error, result) => {
  const { apiKey, privateKey } = result;

  if(apiKey === '' || privateKey === '') { 
    console.log(chalk.red(messages.emptyKeyWarning));
    startInput();
  } else {
    const content = { apiKey, privateKey }
    jsonfile.writeFile(
      keyFilePath, 
      content, 
      (err) => err && console.log(messages.errorSavingFile, err)
    );
  }
}

const startInput = () => {
  prompt.message = prompt.delimited = '';
  prompt.start();
  prompt.get(['apiKey', 'privateKey'], promptCallback)
};

const setKey = () => {
  console.log(console.log(messages.getYourKey));
  startInput();
};

module.exports = setKey;
