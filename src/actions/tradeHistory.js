const { table } = require('table');
const chalk = require('chalk');
const moment = require('moment');
const format = require('number-format.js');
const { getTradeHistory } = require('../api');

const formatItemType = (type) => ( 
  type === 'buy'
    ? chalk.blue(`←${type}`)
    : chalk.yellow(`${type}→`)
);

const formatTradeTime = (tradeTime) => {
  const momentInstance = moment.unix(tradeTime);
  return {
    date: momentInstance.format('d MM YYYY'),
    time: momentInstance.format('HH:mm')
  };
};

const formatFee = (fee) => (
  fee === '0' ? chalk.green(0) : chalk.red(`-${fee}`)
);

const formatPrice = price => (
  `${format('#.000,##', parseInt(price))}`
);

const formatNett = (price, amount, fee = 0) => (
  chalk.bold(`${format('#.000,##', (amount * price) - fee)}`)
);

const tradeHistory = async () => {
  try {
    const options = {
      columns: {
        6: {
          alignment: 'right',
          width: 25
        }
      }
    };
    const tableData = [[ 'type', 'date', 'time', 'bitcoin', '@price (IDR)', 'fee', 'nett (IDR)' ]]
    const result = await getTradeHistory();

    result.forEach(item => {
      // console.log(JSON.stringify(item));
      const dateTime = formatTradeTime(item.trade_time);
      const row = [
        formatItemType(item.type),
        chalk.grey(dateTime.date),
        chalk.grey(dateTime.time),
        item.btc,
        formatPrice(item.price),
        formatFee(item.fee),
        formatNett(item.price, item.btc, item.fee)
      ];
      tableData.push(row);
    });

    const output = table(tableData, options);
    console.log(output);
  } catch(error) {
    console.error(chalk.red(error));
  }
}

module.exports = tradeHistory;
