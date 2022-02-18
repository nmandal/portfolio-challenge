// imports
import fs from 'fs';

import Fund from './fund.js';
import HistoricalFund from './HistoricalFund.js';
import { findDate, formatAllocationDate } from '../utils/date.js';

// pull local data files
const PORTFOLIO = JSON.parse(fs.readFileSync('./data/portfolio_allocation_current.json'));
const HISTORICAL_PORTFOLIO = JSON.parse(fs.readFileSync('./data/portfolio_allocation_historical.json'));

// Portfolio model with list of funds, total value, and portfolio date (default)
export default class Portfolio {
  constructor(funds, total, date=null) {
    this.funds = funds;           // list of funds - ex. { fund: "VTI", shares: 50.64, total: 11461.3512 }
    this.total = total;           // total portfolio value
    this.date  = new Date(date);
  }


  // Get percentage of funds in each asset class
  assetClassBreakdown() {
    let assetClasses = new Map();
    let assetBreakdown = [];

    for (let f in this.funds) {
      let currentFund = this.funds[f];
      let assetClassTotal = assetClasses.get(currentFund.fund.assetClass);

      // get current total for current funds' asset class if exists
      // if it doesn't exist (yet), create entry in map
      if (assetClassTotal) {
        assetClasses.set(currentFund.fund.assetClass, assetClassTotal + currentFund.total);
      } else {
        assetClasses.set(currentFund.fund.assetClass, currentFund.total);
      }
    }

    // once we've iterated over every fund in portfolio, get percentage of total for each asset class
    assetClasses.forEach((assetTotal, assetClass) => {
      assetBreakdown.push({ name: assetClass, percent: assetTotal/this.total });
    });

    return assetBreakdown;
  }

  fundsList() {
    return this.funds.map((f) => {
      return {
        name: f.fund.name,
        shares: f.shares,
        price: f.fund.price,
        total: f.total
      };
    });
  }

  // load portfolio from data/portfolio_allocation_current.json
  static load() {
    let funds = [];
    let total = 0;

    for (let p of PORTFOLIO) {
      // find Fund object by symbol (pulling fund name, symbol, asset class and resolved price)
      let fund = Fund.find(p.symbol);
      let fundTotal = parseFloat(p.shares * fund.price);

      funds.push({ fund: fund, shares: p.shares, total: fundTotal });
      total += fundTotal;
    }

    return new Portfolio(funds, total);
  }

  // 
  static loadHistorical(date) {
    date = new Date(date);

    // get matching date or most recent date before
    let closestDate = findDate(date, HISTORICAL_PORTFOLIO.map((s) => s.date));

    // match closest date to existing portfolio
    let portfolio = HISTORICAL_PORTFOLIO.find((s) => formatAllocationDate(new Date(s.date)) === formatAllocationDate(closestDate)).portfolio;

    // Load funds
    let funds = [];
    let total = 0;
    for (let p of portfolio) {
      // get
      let fund = HistoricalFund.find(p.symbol, date);
      let fundTotal = parseFloat(p.shares * fund.price);

      funds.push({ fund: fund, shares: p.shares, total: fundTotal });
      total += fundTotal;
    }

    return new Portfolio(funds, total);
  }
}
