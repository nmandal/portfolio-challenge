// imports
import Portfolio from './models/Portfolio.js'
import { printAllShares } from './utils/output.js';

(async () => {
  // load portfolio from local file
  let portfolio = Portfolio.load();

  // get formatted list of funds
  let funds = portfolio.fundsList();

  // get formatted portfolio breakdown
  let output = printAllShares(funds, portfolio.total);

  return new Promise((resolve) => {
    // await promise to resolve and log output to console
    resolve(output);
    console.log(output)
  });
})();
