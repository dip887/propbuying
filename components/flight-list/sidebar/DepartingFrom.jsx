const DepartingFrom = () => {
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">BOS Boston</div>
          </div>
        </div>
        {/* End .col */}
        <div className="col-auto">
          <div className="text-15 text-light-1">92</div>
        </div>
      </div>
      {/* End .row */}

      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">PVD Providence</div>
          </div>
        </div>
        {/* End .col */}
        <div className="col-auto">
          <div className="text-15 text-light-1">45</div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default DepartingFrom;
