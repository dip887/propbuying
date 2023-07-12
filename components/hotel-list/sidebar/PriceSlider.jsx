import { useCallback } from "react";
import { numConvertion } from "../../../utils/numberConvertion";
import InputRange from "react-input-range";

const PriceSlider = ({ priceRange, price, setPrice }) => {
  const numDifferentiation = useCallback(numConvertion, []);

  const handleOnChange = (value) => {
    setPrice({
      value,
    });
  };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>
      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">
            ₹{numDifferentiation(price.value.min)}
          </span>
          -
          <span className="js-upper mx-1">
            ₹{numDifferentiation(price.value.max)}
          </span>
        </div>
      </div>
      <div className="px-5">
        <InputRange
          formatLabel={(value) => ``}
          minValue={priceRange.value.min}
          maxValue={priceRange.value.max}
          value={price.value}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
