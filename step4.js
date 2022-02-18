// imports
import fs from 'fs';
import axios from 'axios';

const startDate = new Date("01/01/2020").toISOString().split('T')[0];
const endDate = new Date("01/01/2021").toISOString().split('T')[0];

(async () => {
  // Load data/fund_information.json
  let fundInformation = JSON.parse(await fs.readFileSync('./data/fund_information.json'));

  let fundPrices = [];
  let promises = [];
  
  for (let i = 0; i < fundInformation.length; i++) {
    let fundSymbol = fundInformation[i].symbol
    promises.push(
      axios.get(`https://interview-api-proxy.herokuapp.com/v2/aggs/ticker/${fundSymbol}/range/1/day/${startDate}/${endDate}`)
      .then(res => {
        let data = res.data
        let priceData = data.results
        priceData.forEach(function(p) {
          let date = new Date(p.t).toISOString().split('T')[0];
          let closePrice = p.c;
          fundPrices.push({"date": date, "symbol": fundSymbol, "price": closePrice})
        })
      })
      .catch(error => {
        if (error.response) {
          // response status is an error code
          console.log(error.response.status);
        }
        else if (error.request) {
          // response not received though the request was sent
          console.log(error.request);
        }
        else {
          // an error occurred when setting up the request
          console.log(error.message);
        }
      })
    );
  }

  Promise.all(promises)
  .then(() => {
    fs.writeFileSync("./output/portfolio_breakdown.json", JSON.stringify(fundPrices))
  })

})();
