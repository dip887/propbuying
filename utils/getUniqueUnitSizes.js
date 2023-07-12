export const getUniqueUnitSizes = (properties) => {
  const units = new Set();
  properties.forEach((p) => {
    p.configurations.forEach((c) => {
      units.add(c.unitType.slice(0, 2)[0]);
    });
  });
  return Array.from(units);
};
