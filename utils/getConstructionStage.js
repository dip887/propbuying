export const getConstructionStage = (properties) => {
  const { underConstruction, nearingPossession, readyToMove, launched } =
    properties.reduce(
      (acc, p) => {
        switch (p.projectStatus) {
          case "underConstruction":
            acc.underConstruction++;
            break;
          case "nearingPossession":
            acc.nearingPossession++;
            break;
          case "readyToMove":
            acc.readyToMove++;
            break;
          case "launched":
            acc.launched++;
            break;
        }
        return acc;
      },
      {
        underConstruction: 0,
        nearingPossession: 0,
        readyToMove: 0,
        launched: 0,
      }
    );

  // Return an array of objects representing the count of properties based on their project status
  return [
    {
      label: "Under Construction",
      tag: "underConstruction",
      count: underConstruction,
    },
    {
      label: "Nearing Possession",
      tag: "nearingPossession",
      count: nearingPossession,
    },
    {
      label: "Ready To Move",
      tag: "readyToMove",
      count: readyToMove,
    },
    {
      label: "Launched",
      tag: "launched",
      count: launched,
    },
  ];
};
