### Data Visualization


Create an interesting (not necessarily interactive) visualization of this data. Can you easily output a line graph of the value of a portfolio over time? How about a way to visualize the asset class breakdown of a portfolio?

- highcharts line chart, pie chart
- first get working with JSON output
- then look to pull from pscale

### Web App


Build a simple web app that allows us to view a portfolio on any given day. Feel free to use any freely available web framework you like for this.

Consider building features that make it possible to create new allocation sets or edit existing ones.

- next.js SSR
- list portfolios
- prisma crud


- index can be list of portfolios (desc order to show most recent with line, pie)
- create tab lets user input date, a fund, and num shares
- fetch price when fund inputted (validation)
- calc total value when inputting shares
- detail can allow user to edit allocation

### REST API


Take the scripts you wrote in the Core section and put their functionality behind a REST service of your design. Feel free to use any freely available web framework you like for this.

Document your API’s endpoints in your README. Be sure to explain why you designed them as you did.

- 

### Database


Think about all of the data (funds, prices, allocations) we have scattered across JSON files. What’s the best way to store it in a database?

#### Fund

- name
- symbol
- asset class

#### Portfolio

- date
- json of symbol & shares
- total

#### Price

- date
- symbol
- price

Try modifying your scripts to load and query this data with the datastore of your choice. Feel free to use any freely available database (SQL, NoSQL, or otherwise) that you feel is suited to the task. Describe the schema you create in your README.

What trade-offs have you made? What are the advantages of your design?

- planetscale serverless mysql
# portfolio-challenge
