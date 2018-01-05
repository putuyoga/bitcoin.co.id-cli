#!/usr/bin/env node
const program = require('commander');

const { tradeHistory, setKey } = require('./src/actions');

const action = (command) => {
  switch (command) {
    case 'tradeHistory': tradeHistory(); break;
    case 'setKey': setKey(); break;
    default: console.log('what?'); break;
  }
};

program
  .arguments('<command> [env]')
  .action(action);

program.parse(process.argv);

// const autoTrade = () => {
//   const treshold = 0.3;
//   if(orderSell === 0) {
//     if(orderBuy === 0) {
//       const tresholdPrice = lastOrderSell * treshold;
//       if(currentPrice > tresholdPrice) {
//         buy();
//       } else {
//         hold();
//       }
//     } else {
//       next();
//     }
//   } else {
//     if()
//   }
// }

// - fetch trade/order history
// - check ada order jual yang sedang aktif?
  // - kalau ada, pasang jual + 3% dari trade terakhir
// - kalau tidak ada, 
  // check ada order beli ?
    // kalau ada, pasang beli -3% dari trade terakhir
    // kalau tidak ada > done
// > done
