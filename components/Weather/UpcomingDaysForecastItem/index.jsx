import React from "react";
import PropTypes from "prop-types";

import Image from "next/image";

const imgUrlBase = "https://www.metaweather.com/static/";

const UpcomingDaysForecastItem = ({ weekday, temperature, imgUrl }) => (
  <div className="flex flex-col items-center p-2">
    <img
      className="mb-2"
      width="30"
      src={`${imgUrlBase}img/weather/${imgUrl}.svg`}
      alt=""
    />
    <div className="flex flex-col">
      <span className="font-semibold text-center">{weekday}</span>
      <span className="font-weight-bold text-center">{temperature}&deg;</span>
    </div>
  </div>
);

UpcomingDaysForecastItem.propTypes = {
  weekday: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default UpcomingDaysForecastItem;
