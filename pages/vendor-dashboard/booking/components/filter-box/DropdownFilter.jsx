const DropdownFilter = ({ options, setSelectedItem, selectedItem }) => {
  const handleItemClick = (event) => {
    setSelectedItem(event.target.textContent);
  };

  return (
    <div className="dropdown js-dropdown js-services-active">
      <div
        className="dropdown__button d-flex items-center justify-between bg-white rounded-4 text-14 h-50 text-14 xl:w-auto container border"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
        data-bs-offset="0,10"
      >
        <span className="js-dropdown-title">{selectedItem}</span>
        <i className="icon icon-chevron-sm-down text-7 ml-10" />
      </div>
      <div className="toggle-element -dropdown  dropdown-menu xl:w-1/1 w-auto ">
        <div
          className="text-14 y-gap-15 js-dropdown-list"
          style={{ width: "max-content" }}
        >
          {options?.map((option, index) => (
            <div
              key={index}
              className={`${
                selectedItem === option ? "text-blue-1" : ""
              } js-dropdown-link`}
              onClick={handleItemClick}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;
