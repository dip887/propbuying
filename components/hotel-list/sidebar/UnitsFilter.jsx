const UnitsFilter = ({
  uniqueUnits,
  setUnitsToBeFiltered,
  unitsToBeFiltered,
}) => {
  const handleRatingClick = (rating) => {
    const index = unitsToBeFiltered.indexOf(rating);
    if (index === -1) {
      // Add the rating to the array if it's not already selected
      setUnitsToBeFiltered([...unitsToBeFiltered, rating]);
    } else {
      // Remove the rating from the array if it's already selected
      const newRatings = [...unitsToBeFiltered];
      newRatings.splice(index, 1);
      setUnitsToBeFiltered(newRatings);
    }
  };

  return (
    <>
      {uniqueUnits.map((u) => (
        <div className="col-auto" key={u}>
          <button
            className={`button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100 ${
              unitsToBeFiltered.includes(u) ? "active" : ""
            }`}
            onClick={() => handleRatingClick(u)}
          >
            {u} BHK
          </button>
        </div>
      ))}
      {!uniqueUnits.length && (
        <p className="button -blue-1 text-blue-1 py-5 px-20">No Units Found</p>
      )}
    </>
  );
};

export default UnitsFilter;
