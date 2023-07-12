import haversine from "haversine";
import React, { useState } from "react";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const MapList = ({
  places,
  searchString,
  icons,
  origin,
  setCenter,
  setSelectedPlace,
  setDistance,
  mapRef,
}) => {
  const [showList, setShowList] = useState(false);

  const calcDistance = (lat, lng) => {
    const destination = { latitude: lat, longitude: lng };
    const placeDistance = haversine(origin, destination).toFixed(2) + " km";
    return placeDistance;
  };

  const handleClickLocation = (lat, lng) => {
    const service = new google.maps.places.PlacesService(
      mapRef.current.state.map
    );

    service.getDetails(
      {
        placeId: places.find(
          (place) =>
            place.geometry.location.lat() === lat &&
            place.geometry.location.lng() === lng
        ).place_id,
      },
      function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const placeName = place.name;
          setDistance(calcDistance(lat, lng));
          setSelectedPlace(placeName);
        }
      }
    );
    setCenter({
      lat,
      lng,
    });
  };

  return (
    <div className="map-list-container">
      <div className={`list ${showList ? "active" : ""}`}>
        <div className="top-info border-bottom">
          <div className="header-info">
            <img
              src={icons.find((i) => i.value[0] === searchString[0]).icon}
              alt={searchString[0]}
            />
            <h6>
              {places.length}{" "}
              {icons.find((i) => i.value[0] === searchString[0]).label} around
              your home
            </h6>
          </div>
          <div className="cursor-pointer ">
            {showList ? (
              <RiArrowDownSLine
                className="icon-btn"
                onClick={() => setShowList(false)}
              />
            ) : (
              <RiArrowUpSLine
                className="icon-btn"
                onClick={() => setShowList(true)}
              />
            )}
          </div>
        </div>
        {/* end of top-info */}
        <div className="bottom-info">
          <ul>
            {places.map((p, i) => (
              <li
                onClick={() =>
                  handleClickLocation(
                    p.geometry.location.lat(),
                    p.geometry.location.lng()
                  )
                }
                className="d-flex col-12 items-center justify-between"
                key={i}
              >
                <div className="d-flex items-center left-info">
                  <img
                    src={
                      icons.find((item) => item.value[0] === searchString[0])
                        .icon
                    }
                    alt={searchString[0]}
                  />
                  <h6>{p.name}</h6>
                </div>
                <div className="right-info">
                  {calcDistance(
                    p.geometry.location.lat(),
                    p.geometry.location.lng()
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapList;
