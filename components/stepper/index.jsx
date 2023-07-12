import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { BsCalendar2Check } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { RiUser3Line } from "react-icons/ri";
import StepWizard from "react-step-wizard";
import Calendly from "../calendly";
import DetailsForm from "../calendly/DetailsForm";
import Confirmation from "../calendly/Confirmation";

const Sample = () => {
  const [stepWizard, setStepWizard] = useState(null);
  const [date, setDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="Date/Timeslot">
          <BsCalendar2Check />
        </Step>
        <Step label="Personal Details">
          <RiUser3Line />
        </Step>
        <Step label="Confirmation">
          <TiTick />
        </Step>
      </Stepper>
      {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
      <StepWizard
        instance={assignStepWizard}
        onStepChange={handleStepChange}
        isHashEnabled={false}
      >
        <Calendly date={date} setDate={setDate} />
        <DetailsForm
          appointmentType={appointmentType}
          setAppointmentType={setAppointmentType}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
        />
        <Confirmation />
      </StepWizard>
    </div>
  );
};

export default Sample;
