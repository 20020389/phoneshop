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

export function convertTime(timeStr) {
  var datetime = new Date(timeStr);
  var hours = datetime.getHours();
  var minutes = datetime.getMinutes();
  var date = datetime.getDate();
  var month = datetime.getMonth() + 1;
  var year = datetime.getFullYear();
  var newTimeStr =
    hours + ':' + minutes + ' ' + date + '/' + month + '/' + year;
  return newTimeStr;
}
