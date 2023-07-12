export const convertToTitleCase = (str) => {
  // Add a space before every capital letter
  const titleCaseStr = str.replace(/([A-Z])/g, " $1");

  // Capitalize the first letter and return the result
  return titleCaseStr.charAt(0).toUpperCase() + titleCaseStr.slice(1);
};
