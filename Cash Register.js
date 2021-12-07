function checkCashRegister(price, cash, cid) {
  let result = {
    status: "",
    change: []
  };
  const denominations = [["ONE HUNDRED", 100], ["TWENTY", 20], ["TEN", 10], ["FIVE", 5], ["ONE", 1], ["QUARTER", 0.25], ["DIME", 0.1], ["NICKEL", 0.05], ["PENNY", 0.01]];
  const required = cash-price;
  let tempCid = [...cid];
  if (tempCid.reduce((sum, money) => sum + money[1], 0)==required) {
    return {status: "CLOSED", change: cid};
  };
  let sortedCid = [];
  for (let i=0;i<cid.length;i++) {
    sortedCid.push([cid[cid.length-1-i][0],cid[cid.length-1-i][1]]);
  };
  let changeStillNeeded = cash-price;
  let temp = null;
  for (let j=0;j<sortedCid.length;j++) {
    if (denominations[j][1]<=changeStillNeeded && sortedCid[j][1]>0) {
      let partialChange = [];
      partialChange.push(sortedCid[j][0]);
      partialChange.push(0);
      if (sortedCid[j][1]>=changeStillNeeded) {
        while (changeStillNeeded>=denominations[j][1]) {
          temp = Math.round((temp + denominations[j][1])*100)/100;
          changeStillNeeded = Math.round((changeStillNeeded - denominations[j][1])*100)/100;
          partialChange[1] = partialChange[1] + denominations[j][1];
          sortedCid[j][1] = sortedCid[j][1] - denominations[j][1];
        };
      } else {
        while (sortedCid[j][1]>0) {
          temp = Math.round((temp + denominations[j][1])*100)/100;
          changeStillNeeded = Math.round((changeStillNeeded - denominations[j][1])*100)/100;
          partialChange[1] = partialChange[1] + denominations[j][1];
          sortedCid[j][1] = sortedCid[j][1] - denominations[j][1];
        };
      };
      if (partialChange!==[]) {
        result.change.push(partialChange);
      };
    };
  };
  if (temp==required) {
    result.status = "OPEN";
  } else {
    result.status = "INSUFFICIENT_FUNDS";
    result.change = [];
  }
  return result;
};

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); // {status: 'OPEN', change: ['QUARTER', 0.5]}
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); // {status: 'OPEN', change: [['TWENTY', 60], ['TEN', 20], ['FIVE', 15], ['ONE', 1], ['QUARTER', 0.5], ['DIME', 0.2], ['PENNY', 0.04]]}
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); // {status: 'INSUFFICIENT_FUNDS', change: []}
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); // {status: 'INSUFFICIENT_FUNDS', change: []}
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); // {status: 'CLOSED', change: [['PENNY', 0.5], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]}
