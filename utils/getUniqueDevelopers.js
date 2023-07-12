export const getUniqueDevelopers = (filteredProperties) => {
  return [...new Set(filteredProperties?.map((p) => p.developerName))];
};
