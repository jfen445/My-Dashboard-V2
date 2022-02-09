import React from "react";
import PropTypes from "prop-types";

import UpcomingDaysForecastItem from "../UpcomingDaysForecastItem";

const UpcomingDaysForecast = ({ days }) => (
  <div className="flex m-auto justify-between">
    {days.map((day) => (
      <UpcomingDaysForecastItem {...day} key={day.weekday} />
    ))}
  </div>
);

UpcomingDaysForecast.propTypes = {
  days: PropTypes.array.isRequired,
};

export default UpcomingDaysForecast;
