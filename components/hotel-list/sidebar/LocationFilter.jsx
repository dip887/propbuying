import { useEffect } from "react";

const LocationFilter = ({
  uniqueLocations,
  setLocations,
  locations,
  setLocationsToBeFiltered,
}) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setLocations([...locations, value]);
    } else {
      setLocations(locations.filter((val) => val !== value));
    }
  };

  useEffect(() => {
    if (locations.length) {
      setLocationsToBeFiltered(locations.join(","));
    } else {
      setLocationsToBeFiltered("");
    }
  }, [locations]);

  return (
    <>
      {uniqueLocations?.map((filter, index) => (
        <div key={index} className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="location"
                checked={locations.includes(filter.label)}
                value={filter.label}
                onChange={handleCheckboxChange}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{filter.label}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{filter.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LocationFilter;
