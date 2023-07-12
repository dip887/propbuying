import { useState } from "react";
import Calendar from "react-calendar";

const MeetingBookingPage = ({ date, setDate, nextStep }) => {
  const timeSlots = getTimeSlots(date);
  const [timeSelected, setTimeSelected] = useState("");

  return (
    <div className="meeting-booking-page">
      <div className="calendar-container">
        <div className="calendar-wrapper">
          <Calendar
            minDate={new Date()}
            onChange={setDate}
            value={date}
            tileClassName="calendar-tile"
            calendarType="US"
          />
        </div>
        {date && (
          <div className="time-slots">
            <h2>Available Time Slots</h2>
            <ul>
              {timeSlots.map((timeSlot) => (
                <li
                  className={timeSelected === timeSlot ? "active" : ""}
                  onClick={(e) => setTimeSelected(timeSlot)}
                  key={timeSlot}
                >
                  {timeSlot}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={nextStep} disabled={!timeSelected} className="req-btn">
        Continue
      </button>
    </div>
  );
};

function getTimeSlots(date) {
  // This function should return an array of available time slots for the selected date
  // For this example, we'll just return a hard-coded list of time slots
  if (!date) {
    return [];
  }

  return [
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "7:00 PM",
    "8:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
  ];
}

export default MeetingBookingPage;
