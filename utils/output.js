// Output portfolio shares
export function printShares(name, shares, price, total) {
  return `${name}: ${shares} shares at $${price.toFixed(2)} ea. -- $${total.toFixed(2)}`;
}
   
// Output portfolio total
export function printTotal(total) {
  return `Total: $${total.toFixed(2)}`;
}
  
// Output formatted portfolio
export function printAllShares(funds, total) {
  let output = [];
  for (let f in funds) {
    let currentFund = funds[f];
    output.push(printShares(currentFund.name, currentFund.shares, currentFund.price, currentFund.total));
  }

  output.push(printTotal(total));
  return output.join('\n');
}
  
// Output assetClass
export function printAssetClass(name, percent) {
  return `  ${name}: ${(percent*100).toFixed(2)}%`;
}
  
// Output formatted asset class breakdown
export function printAssetClassBreakdown(assetClassBreakdown) {
  let output = ['Asset Class Breakdown'];
  for (let a in assetClassBreakdown) {
    let assetClass = assetClassBreakdown[a];
    output.push(printAssetClass(assetClass.name, assetClass.percent));
  }
  return output.join('\n');
}
