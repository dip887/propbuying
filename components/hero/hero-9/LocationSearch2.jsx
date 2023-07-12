import { BiHome } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import Select, { components } from "react-select";

const sizeList = [
  {
    id: 1,
    value: "1",
    label: "1 BHK",
  },
  {
    id: 2,
    value: "2",
    label: "2 BHK",
  },
  {
    id: 3,
    value: "3",
    label: "3 BHK",
  },
  {
    id: 4,
    value: "4",
    label: "4 BHK",
  },
  {
    id: 5,
    value: "5",
    label: "5 BHK",
  },
];

const LocationSearch2 = ({ selectedSizes, setSelectedSizes }) => {
  function handleSelect(data) {
    setSelectedSizes(data);
  }
  const { Option } = components;

  const IconOption = (props) => (
    <Option
      {...props}
      className="citiesCard -type-5 d-flex items-center sm:flex-column sm:items-start px-20 py-20 sm:px-15 sm:py-20 bg-light-2 rounded-4"
    >
      <BiHome className="text-24" />
      <div className="ml-10 sm:ml-0 sm:mt-10">
        <h4 className="text-16 fw-500">{props.data.label}</h4>
      </div>
    </Option>
  );

  return (
    <>
      <div
        className="searchMenu-loc lg:py-20 lg:px-0 js-form-dd js-liverSearch"
        style={{ padding: "0px 10px" }}
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Size</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <Select
            required
            id="instanceId"
            options={sizeList}
            placeholder="Select Sizes"
            value={selectedSizes}
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

export default LocationSearch2;
