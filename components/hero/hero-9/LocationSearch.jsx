import { useEffect, useState } from "react";
import { sanityClient } from "../../../clients/sanityClient";
import Select, { components } from "react-select";
import { FiMapPin } from "react-icons/fi";

const LocationSearch = ({ selectedLocations, setSelectedLocations }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await sanityClient.fetch(`
        *[_type == "locality"]{
          "id": _id,
          localityName,
          "shortDescription": localityPropertyDescription 
        }
      `);
      const obj = data.map((l) => {
        return {
          id: l.id,
          value: l.shortDescription,
          label: l.localityName,
        };
      });

      setLocations(obj);
    })();
  }, []);

  const { Option } = components;

  const IconOption = (props) => (
    <Option
      {...props}
      className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
    >
      <FiMapPin className="text-24" />
      <div className="ml-10 sm:ml-0 sm:mt-10">
        <h4 className="text-16 fw-500">{props.data.label}</h4>
        <p className="text-14">{props.data.value}</p>
      </div>
    </Option>
  );

  function handleSelect(data) {
    setSelectedLocations(data);
  }

  return (
    <>
      <div
        className="searchMenu-loc lg:py-20 lg:px-0 js-form-dd js-liverSearch"
        style={{ padding: "0px 10px" }}
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <Select
            required
            id="instanceId"
            options={locations}
            placeholder="Select Locations"
            value={selectedLocations}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
            components={{ Option: IconOption }}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                paddingLeft: 0,
                paddingRight: 0,
                boxShadow: "none",
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                display: "none",
              }),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LocationSearch;
