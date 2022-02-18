// imports
import Portfolio from './models/Portfolio.js'
import { printAllShares, printAssetClassBreakdown } from './utils/output.js';

(async () => {
  // grab date from console input
  let date = process.argv[2]
  
  // validate that date was submitted
  // could get more granular with type checking for date validity
  if (!date) {
    console.error('No input date provided.')
    return
  }

  // load historical portfolio from local file
  let portfolio = Portfolio.loadHistorical(date);

  // get formatted list of funds
  let funds = portfolio.fundsList();

  // get formatted portfolio breakdown
  let assetBreakdown = portfolio.assetClassBreakdown();

  // collect output to print
  let outputShares = printAllShares(funds, portfolio.total);
  let outputAssets = printAssetClassBreakdown(assetBreakdown);

  return new Promise((resolve) => {
    // await promise to resolve and log output to console 
    resolve(outputShares + '\n\n' + outputAssets);
    console.log(outputShares + '\n\n' + outputAssets);
  });
})();
