export const filterProperties = (
  properties,
  locationsToBeFiltered,
  unitsToBeFiltered,
  constructionStageToBeFiltered,
  price,
  developerToBeFiltered
) => {
  let filteredData = [...properties];
  if (locationsToBeFiltered.length) {
    filteredData = filteredData.filter((p) =>
      locationsToBeFiltered.includes(p.location)
    );
  }
  if (unitsToBeFiltered.length) {
    filteredData = filteredData.filter((p) =>
      p.configurations.some((c) =>
        unitsToBeFiltered.includes(c.unitType.slice(0, 2)[0])
      )
    );
  }
  if (constructionStageToBeFiltered.length) {
    filteredData = filteredData.filter((p) =>
      constructionStageToBeFiltered.includes(p.projectStatus)
    );
  }
  if (price.value.max || price.value.min) {
    filteredData = filteredData.filter((p) => {
      const prices = p.configurations.map((c) => {
        if (c.denominatior === "Lakh") {
          return Math.round(c.price * 100000);
        } else {
          return Math.round(c.price * 10000000);
        }
      });
      const minPrice = price.value.min || Math.min(...prices);
      const maxPrice = price.value.max || Math.max(...prices);
      return prices.some((price) => price >= minPrice && price <= maxPrice);
    });
  }
  if (developerToBeFiltered.length) {
    filteredData = filteredData.filter((p) =>
      constructionStageToBeFiltered.includes(p.developerName)
    );
  }

  return filteredData;
};
