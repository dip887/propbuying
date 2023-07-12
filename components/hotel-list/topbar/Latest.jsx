const Latest = ({ isLatest, setIsLatest }) => {
  const handleIsLatest = (e) => {
    setIsLatest(e.target.checked);
  };

  return (
    <div className="form-checkbox d-flex items-center">
      <input type="checkbox" checked={isLatest} onChange={handleIsLatest} />
      <div className="form-checkbox__mark">
        <div className="form-checkbox__icon icon-check" />
      </div>
      <div className="text-15 ml-10">Latest</div>
    </div>
  );
};

export default Latest;
