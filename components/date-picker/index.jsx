import moment from "moment";
import { useState } from "react";
import { SingleDatePicker } from "react-dates";

const DatePicker = ({ date, setDate }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <SingleDatePicker
      date={moment(date)}
      onDateChange={(date) => setDate(date)}
      focused={isFocused}
      onFocusChange={({ focused }) => setIsFocused(focused)}
      id="date-picker"
      showDefaultInputIcon={false}
      numberOfMonths={1}
    />
  );
};

export default DatePicker;
