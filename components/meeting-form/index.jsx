import { useState } from "react";
import TimeDropdown from "../time-dropdown";
import DatePicker from "../date-picker";

const MeetingForm = () => {
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="border rounded-1 px-20 py-20 meeting-form-container">
      <div className="border-bottom mb-10 py-20">
        <h4>Taker a tour with a buyer agent.</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <p className="sub-header">
          We will connect you with a local agent who can give you a personalized
          tour of the home in-person or via video chat.
        </p>
        <div className="d-flex gap-2 flex-column items-start mt-10 justify-start appointment-type-container">
          <h5 className="mb-10">Select an appointment type</h5>
          <div className="d-flex gap-2 items-center justify-start appointment-type-container">
            <button
              onClick={(e) => setAppointmentType(e.target.name)}
              name="in-person"
              className={`px-60 fw-600 py-5 text-center border cursor-pointer ${
                appointmentType === "in-person" ? "active" : ""
              }`}
            >
              In-person
            </button>
            <button
              onClick={(e) => setAppointmentType(e.target.name)}
              name="video-chat"
              className={`px-60 fw-600 py-5 text-center border cursor-pointer ${
                appointmentType === "video-chat" ? "active" : ""
              }`}
            >
              Video chat
            </button>
          </div>
        </div>
        {/* end of appointment input */}
        <div className="d-flex gap-2 flex-column items-start mt-30 mb-30 justify-start date-slider-container">
          <h5 className="">Select a date</h5>
          {/*<DateSelector setDate={setDate} date={date} />*/}
          <DatePicker date={date} setDate={setDate} />
        </div>
        {/* end of date slider */}
        <div className="mb-30">
          <TimeDropdown time={time} setTime={setTime} />
        </div>
        {/* end of time dropdown */}
        <button className="req-btn">Request this time</button>
      </form>
    </div>
  );
};

export default MeetingForm;
