/** @param {string} str */
function upperFirstChar(str) {
  return str.at(0).toUpperCase() + str.toLowerCase().substring(1);
}

const util = { upperFirstChar };

export { util };
