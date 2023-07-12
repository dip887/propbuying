import React from "react";
import Calendar from "react-calendar";

const DateSelector = ({ date, setDate }) => {
  return (
    <div className="col-12">
      <Calendar
        className="col-12 rounded-1 overflow-hidden"
        onChange={setDate}
        value={date}
        minDate={new Date()}
      />
    </div>
  );
};

export default DateSelector;
