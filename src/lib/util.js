/** @param {string} str */
function upperFirstChar(str) {
  return str.at(0).toUpperCase() + str.toLowerCase().substring(1);
}

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  return formatter.format(price);
};

const util = { upperFirstChar, formatPrice };

export { util };
