
// imports
import fs from 'fs';
import axios from 'axios';

(async () => {
  // Load fund data from data/fund_information.json
  let fundInformation = JSON.parse(await fs.readFileSync('./data/fund_information.json'));

  // Create array to store fund prices (output) and promises
  let fundPrices = [];
  let promises = [];

  for (let i = 0; i < fundInformation.length; i++) {
    let fundSymbol = fundInformation[i].symbol

    // create array of promises, pulling the price for each fund from API
    promises.push(
      axios.get(`https://interview-api-proxy.herokuapp.com/v1/last/stocks/${fundSymbol}`)
      .then(res => {
        let data = res.data
        let fundPrice = data.last.price

        fundPrices.push({"symbol": fundSymbol, "price": fundPrice})
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

  // await all the promises to resolve before writing to output/fund_prices.json
  Promise.all(promises)
  .then(() => {
    fs.writeFileSync("./output/fund_prices.json", JSON.stringify(fundPrices))
  })

})();
