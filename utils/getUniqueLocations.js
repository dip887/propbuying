export const getUniqueLocations = (properties) => {
  const locations = {};
  properties.forEach((p) => {
    locations[p.location] =
      (locations[p.location] || 0) + p.configurations.length;
  });

  return Object.keys(locations).map((location) => ({
    label: location,
    count: locations[location],
  }));
};
