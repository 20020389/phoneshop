/** @param {string} str */
function upperFirstChar(str) {
  return str.at(0).toUpperCase() + str.toLowerCase().substring(1);
}

export function formatPrice(price, char = ',') {
  price = price.replace('vnd', '').replace(',', '');
  let newPrice = '';
  for (let i = price.length - 1, j = 1; i >= 0; i--, j++) {
    newPrice = price.charAt(i) + newPrice;
    if (i !== price.length - 1 && i !== 0) {
      if (j % 3 === 0) {
        newPrice = char + newPrice;
      }
    }
  }
  return newPrice;
}

const util = { upperFirstChar, formatPrice };

export { util };
