export const calculatePriceRange = (properties) => {
  let allPrices = [];

  properties.forEach((property) => {
    property.configurations.forEach((configuration) => {
      const priceMultiplier =
        configuration.denominatior === "Lakh" ? 100000 : 10000000;
      allPrices.push(Math.round(configuration.price * priceMultiplier));
    });
  });

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return { min: minPrice, max: maxPrice };
};

export const calPriceRangeSingleProperty = (property) => {
  let allPrices = [];
  property.configurations.forEach((configuration) => {
    const priceMultiplier =
      configuration.denominatior === "Lakh" ? 100000 : 10000000;
    allPrices.push(Math.round(configuration.price * priceMultiplier));
  });
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return { min: minPrice, max: maxPrice };
};
