import React from "react";
import PropTypes from "prop-types";

import locationIcon from "../../../images/location-pin.png";
import Image from "next/image";

const CurrentDay = ({
  weekday,
  date,
  location,
  temperature,
  weatherIcon,
  weatherDescription,
}) => (
  console.log(locationIcon),
  (
    <div className="d-flex pl-4">
      <div
        className={`d-flex flex-column justify-content-between pt-3 pb-2 pl-2`}
      >
        <div className="mb-8">
          <h2 className="font-black text-white" style={{ "font-size": "30px" }}>
            {weekday}
          </h2>
          <p className="text-white">{date}</p>
          <p className="d-flex align-items-baseline font-weight-lighter mb-1">
            <Image
              width={10}
              height={15}
              src={locationIcon}
              alt=""
              className="mr-2"
            />
            <span className="text-white ml-2">{location}</span>
          </p>
        </div>
        <div>
          <img width="45px" src={weatherIcon.substring(1)} alt="" />
          <h2 className="font-black text-white">
            <span
              className="font-black text-white"
              style={{ "font-size": "30px" }}
              c
            >
              {temperature}
            </span>
            °C
          </h2>
          <h5 className="text-white">{weatherDescription}</h5>
        </div>
      </div>
    </div>
  )
);

CurrentDay.propTypes = {
  weekday: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  weatherIcon: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  weatherDescription: PropTypes.string.isRequired,
};

export default CurrentDay;
