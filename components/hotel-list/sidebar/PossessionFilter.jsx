const PossessionFilter = ({
  constructionData,
  setConstructionStageToBeFiltered,
  constructionStageToBeFiltered,
}) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setConstructionStageToBeFiltered([
        ...constructionStageToBeFiltered,
        value,
      ]);
    } else {
      setConstructionStageToBeFiltered(
        constructionStageToBeFiltered.filter((val) => val !== value)
      );
    }
  };

  return (
    <>
      {constructionData.map((c, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                name="stage"
                type="checkbox"
                checked={constructionStageToBeFiltered.includes(c.tag)}
                value={c.tag}
                onChange={handleCheckboxChange}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{c.label}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{c.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PossessionFilter;
