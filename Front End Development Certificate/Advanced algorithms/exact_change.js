/*
Design a cash register drawer function checkCashRegister() that accepts
purchase price as the first argument (price), payment as the second
argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the
change due. Return the string "Closed" if cash-in-drawer is equal to the
change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.
*/

// denominations will be used in counting the change
var denominations = [
  {name: 'ONE HUNDRED',  value: 100.00},
  {name: 'TWENTY',       value: 20.00},
  {name: 'TEN',          value: 10.00},
  {name: 'FIVE',         value: 5.00},
  {name: 'ONE',          value: 1.00},
  {name: 'QUARTER',      value: 0.25},
  {name: 'DIME',         value: 0.10},
  {name: 'NICKEL',       value: 0.05},
  {name: 'PENNY',        value: 0.01}
];

function checkCashRegister(price, cash, cid) {

  var change = cash - price;

  var totalCid = cid.reduce(function(acc, next) {
    return acc + next[1];
  }, 0.0);

  if (totalCid < change) {
    return 'Insufficient Funds';
  } else if (totalCid === change) {
    return 'Closed';
  }

  // reverse cash-in-drawer order so we can start counting back the change with
  // the help of denominations
  cid = cid.reverse();

  var result = denominations.reduce(function(acc, next, index) {
    if (change >= next.value) {
      var currentValue  = 0.0;

      while (change >= next.value && cid[index][1] >= next.value) {
        currentValue += next.value;
        change -= next.value;
        change = Math.round(change * 100) / 100; // to fix rounding error
        cid[index][1] -= next.value;
      }
      acc.push([next.name, currentValue]);
      return acc;
    } else {
      return acc;
    }
  }, []);

  return result.length > 0 && change === 0 ? result : 'Insufficient Funds';
}
