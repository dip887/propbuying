import Stories from "../../stories";
import TopBar from "../topbar";

const TopHeaderFilter = ({
  properties,
  filteredProperties,
  setFilteredProperties,
}) => {
  return (
    <>
      <div className="topbar-container d-flex justify-between items-center col-12">
        <div className="d-flex story-container justify-between items-center col-8">
          <Stories />
        </div>
        {/* End .col */}
        <div className="d-flex xl:d-none w-auto justify-end items-center links-container col-4">
          <TopBar
            properties={properties}
            filteredProperties={filteredProperties}
            setFilteredProperties={setFilteredProperties}
          />
        </div>
        {/* End .col */}
        <div className="col-auto header-links-wrapper">
          <div className="row x-gap-20 y-gap-20 ">
            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingTopbar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Sort
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;
