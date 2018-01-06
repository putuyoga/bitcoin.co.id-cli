const { table } = require('table');
const chalk = require('chalk');
const { getBalance } = require('../api');

const balance = async () => {
  try {
    const options = {
      columns: {
        1: {
          alignment: 'right',
          width: 25
        }
      }
    };
    const tableData = [[ chalk.bold('currency'), chalk.bold('balance') ]];
    const result = await getBalance();
    Object.keys(result).forEach(key => {
      const row = [chalk.cyan(key.toUpperCase()), result[key]];
      tableData.push(row);
    });

    const output = table(tableData, options);
    console.log(output);
  } catch(error) {
    console.error(chalk.red(error));
  }
}

module.exports = balance;
