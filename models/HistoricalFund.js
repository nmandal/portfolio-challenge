// imports
import fs from 'fs';

import Fund from './Fund.js';

// pull local data files
const FUNDS = JSON.parse(fs.readFileSync('./data/fund_information.json'));

// Historical Fund model (with Fund parent class)
export default class HistoricalFund extends Fund {
  constructor(params) {
    params.date = new Date(params.date);
    super(params);
    this._date = params.date;
  }

  // resolve fund by symbol from data/fund_information.json
  static find(symbol, date) {
    let fundInformation = FUNDS.find((f) => f.symbol === symbol);
    fundInformation.date = date;
    if (fundInformation) { 
      return new HistoricalFund(fundInformation); 
    }

    // Could look to resolve fund information from Polygon reference data API
    return null;
  }
}
