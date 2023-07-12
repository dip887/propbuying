import React, { useState } from "react";
import IntlTelInput from "react-intl-tel-input";

const DetailsForm = ({
  email,
  setEmail,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  appointmentType,
  setAppointmentType,
  previousStep,
  nextStep,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [numberError, setNumberError] = useState("");

  const handlePhoneNumberChange = (status, value, countryData, number, id) => {
    if (!value) {
      setNumberError("Invalid phone number");
    } else {
      setNumberError("");
      setPhoneNumber(value);
    }
  };
  return (
    <div className="details-form-container">
      <div className="col-12 px-20 py-10">
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                className="pt-20"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <label className="lh-1 text-14 text-light-1">Name</label>
            </div>
          </div>
          {/* end email */}
          <div className="col-12 my-2">
            <div className="form-input">
              <input
                type="email"
                className="pt-20"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label className="lh-1 text-14 text-light-1">Email</label>
            </div>
          </div>
          {/* end email */}
          <div className="col-12 mb-3">
            <div className="form-input">
              <IntlTelInput
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                onPhoneNumberChange={handlePhoneNumberChange}
                defaultCountry="in"
              />
            </div>
          </div>

          <div className="col-12 mb-3">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="type"
                checked={appointmentType == "in-person"}
                value={appointmentType}
                onChange={() => setAppointmentType("in-person")}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">In-person</div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="type"
                checked={appointmentType == "video-chat"}
                value={appointmentType}
                onChange={() => setAppointmentType("video-chat")}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">Video chat</div>
            </div>
          </div>
          {/* end number */}
          <div className="col-12 d-flex items-center gap-2 btn-container">
            <button className="back-btn w-1/1" onClick={previousStep}>
              Go Back
            </button>
            <button
              onClick={nextStep}
              disabled={numberError || !phoneNumber || !email || !name}
              style={{
                cursor: numberError ? "not-allowed" : "pointer",
              }}
              className="req-btn w-1/1"
              type="submit"
            >
              Submit
            </button>
          </div>
          {numberError && (
            <p className="text-red-1 text-sm text-center">{numberError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DetailsForm;
