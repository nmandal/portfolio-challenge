// imports
import Portfolio from './models/Portfolio.js'
import { printAssetClassBreakdown } from './utils/output.js';

(async () => {
  // load portfolio from local file
  let portfolio = Portfolio.load();

  // calculate asset class breakdown
  let assetBreakdown = portfolio.assetClassBreakdown();

  // get formatted portfolio breakdown
  let output = printAssetClassBreakdown(assetBreakdown);

  return new Promise((resolve) => {
    // await promise to resolve and log output to console 
    resolve(output);
    console.log(output)
  });
})();
