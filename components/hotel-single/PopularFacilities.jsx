import { convertToTitleCase } from "../../utils/caseConversion";

const iconsData = [
  {
    label: "atm",
    icon: "/img/icons/amenities/002-atm-machine.svg",
  },
  {
    label: "gated community",
    icon: "/img/icons/amenities/001-gate.svg",
  },
  {
    label: "bank",
    icon: "/img/icons/amenities/003-bank.svg",
  },
  {
    label: "cctv",
    icon: "/img/icons/amenities/004-cctv.svg",
  },
  {
    label: "cafeteria",
    icon: "/img/icons/amenities/005-cafe.svg",
  },
  {
    label: "children play area",
    icon: "/img/icons/amenities/006-playground.svg",
  },
  {
    label: "cricket ground",
    icon: "/img/icons/amenities/007-cricket-ball.svg",
  },
  {
    label: "club house",
    icon: "/img/icons/amenities/008-night-club.svg",
  },
  {
    label: "fire fighting systems",
    icon: "/img/icons/amenities/009-fire-alarm.svg",
  },
  {
    label: "garden",
    icon: "/img/icons/amenities/010-flowers.svg",
  },
  {
    label: "gas pipeline",
    icon: "/img/icons/amenities/011-valve.svg",
  },
  {
    label: "gym",
    icon: "/img/icons/amenities/012-treadmill.svg",
  },
  {
    label: "hospital",
    icon: "/img/icons/amenities/013-hospital-bed.svg",
  },
  {
    label: "indoor games",
    icon: "/img/icons/amenities/014-billiards.svg",
  },
  {
    label: "intercom",
    icon: "/img/icons/amenities/015-landline.svg",
  },
  {
    label: "jogging track",
    icon: "/img/icons/amenities/016-jogging.svg",
  },
  {
    label: "lift",
    icon: "/img/icons/amenities/017-lift.svg",
  },
  {
    label: "maintenance staff",
    icon: "/img/icons/amenities/018-tech-support.svg",
  },
  {
    label: "multipurpose hall",
    icon: "/img/icons/amenities/019-city-hall.svg",
  },
  {
    label: "power backup",
    icon: "/img/icons/amenities/020-generator.svg",
  },
  //{
  //  label: "maintainance staff",
  //  icon: "/img/icons/amenities/021-electric-car.svg",
  //},
  {
    label: "rain water harvesting",
    icon: "/img/icons/amenities/022-water.svg",
  },
  {
    label: "school",
    icon: "/img/icons/amenities/023-school.svg",
  },
  {
    label: "security",
    icon: "/img/icons/amenities/024-policeman.svg",
  },
  //{
  //  label: "",
  //  icon: "/img/icons/amenities/025-store.svg",
  //},
  {
    label: "shopping mall",
    icon: "/img/icons/amenities/026-mall.svg",
  },
  {
    label: "skating ring",
    icon: "/img/icons/amenities/027-roller-skater.svg",
  },
  {
    label: "sports facility",
    icon: "/img/icons/amenities/028-balls.svg",
  },
  {
    label: "staff quarter",
    icon: "/img/icons/amenities/029-room-service.svg",
  },
  {
    label: "swimming pool",
    icon: "/img/icons/amenities/030-swimming-pool.svg",
  },
  {
    label: "vaastu compliant",
    icon: "/img/icons/amenities/032-hindu.svg",
  },
  {
    label: "visitors parking",
    icon: "/img/icons/amenities/033-parking-area.svg",
  },
  {
    label: "waste disposal",
    icon: "/img/icons/amenities/034-dumpster.svg",
  },
];

const PopularFacilities = ({ amenities }) => {
  return (
    <>
      {amenities.map((m, i) => (
        <div key={i} className="col-md-5">
          <div className="d-flex x-gap-15 y-gap-15 items-center">
            <img
              className="amenities-icon"
              src={
                iconsData.find((item) =>
                  item.label.includes(convertToTitleCase(m).toLowerCase())
                )?.icon
              }
              alt={m}
            />

            <div className="text-15">{convertToTitleCase(m)}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PopularFacilities;
