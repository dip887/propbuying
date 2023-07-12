import { numConvertion } from "./numberConvertion";

export const lowestEmiCalculator = (minNumber) => {
  const price = numConvertion(minNumber);
  const denominatior = price.split(" ")[1];
  const num = price.split(" ")[0];
  const emi = Number(num) * 0.8 * (denominatior === "Lakh" ? 769 : 76900);

  return numConvertion(emi);
};
