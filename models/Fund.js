// imports
import fs from 'fs';

// pull local data files
const FUNDS = JSON.parse(fs.readFileSync('./data/fund_information.json'));
const FUND_PRICES = JSON.parse(fs.readFileSync('./output/fund_prices.json'));

// Fund model with fund name, fund symbol, fund asset class and fund price (resolved from output)
export default class Fund {
  constructor(params) {
    this.name = params.name;              // ex. Vanguard Total Stock Market Index Fund
    this.symbol = params.symbol;          // ex. VTI
    this.assetClass = params.assetClass;  // ex. U.S. Stocks
    this.price = this.getPrice(params);   // pull price from output/fund_prices.json (generated in step 1)
  }

  // pull price by symbol from output/fund_prices.json
  getPrice(params) {
    return parseFloat(FUND_PRICES.find((f) => f.symbol === params.symbol).price);
  }

  // resolve fund by symbol from data/fund_information.json
  static find(symbol) {
    let fundInformation = FUNDS.find((f) => f.symbol === symbol);
    if (fundInformation) { 
      return new Fund(fundInformation); 
    }

    // Could look to resolve fund information from Polygon reference data API
    return null;
  }
}
