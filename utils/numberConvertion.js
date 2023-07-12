export const numConvertion = (value) => {
  let val = Math.abs(value);
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(1) + " Crore";
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(1) + " Lakh";
  } else if (val >= 1000) {
    val = (val / 1000).toFixed(1) + " K";
  }
  return val;
};
