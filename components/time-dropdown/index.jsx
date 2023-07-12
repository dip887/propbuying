import Select from "react-select";

const options = [];

for (let i = 1; i <= 12; i++) {
  options.push({ value: `${i}:00 AM`, label: `${i}:00 AM` });
}

for (let i = 1; i <= 12; i++) {
  options.push({ value: `${i}:00 PM`, label: `${i}:00 PM` });
}

const TimeDropDown = ({ time, setTime }) => {
  return <Select onChange={(e) => setTime(e.value)} options={options} />;
};

export default TimeDropDown;
