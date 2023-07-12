const DeveloperFilter = ({
  developerData,
  developerToBeFiltered,
  setDeveloperToBeFiltered,
}) => {
  const handleDeveloperSelect = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setDeveloperToBeFiltered([...developerToBeFiltered, value]);
    } else {
      setDeveloperToBeFiltered(
        developerToBeFiltered.filter((d) => d !== value)
      );
    }
  };

  return (
    <>
      {developerData.map((d, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                value={d}
                checked={developerToBeFiltered.includes(d)}
                onChange={handleDeveloperSelect}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{d}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DeveloperFilter;
