import { useState } from "react";
import { useRouter } from "next/router";
import LocationSearch from "./LocationSearch";
import LocationSearch2 from "./LocationSearch2";

const MainFilterSearchBox = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const locations = selectedLocations.map((l) => l.label);
    const sizes = selectedSizes.map((s) => s.value);

    router.push({
      pathname: "/properties/properties-in-pune",
      query: {
        locations: locations.join(","),
        sizes: sizes.join(","),
        sort: "Newest Property",
      },
    });
  };

  return (
    <>
      <div className="mainSearch bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20  rounded-1">
        <form className="button-grid items-center" onSubmit={handleSubmit}>
          <LocationSearch
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
          />
          {/* End Location */}

          <LocationSearch2
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
          />

          {/* End check-in-out */}

          {/* End guest */}

          <div className="button-item">
            <button
              className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
              type="submit"
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </form>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
