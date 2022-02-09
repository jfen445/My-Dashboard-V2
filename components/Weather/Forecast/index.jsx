import React from "react";
import PropTypes from "prop-types";
import CurrentDay from "../CurrentDay";
import CurrentDayDescription from "../CurrentDayDescription";
import UpcomingDaysForecast from "../UpcomingDaysForecast";

import mounaitn from "../../../images/mountain.jpg";

const Forecast = ({ forecast }) => (
  <div className="bg-primary-blue-15 flex w-full rounded-xl max-w-xl">
    <div className="bg-primary-blue-100 rounded-xl pr-4">
      <CurrentDay {...forecast.currentDay} />
    </div>
    <div className="w-full mx-8">
      <CurrentDayDescription forecast={forecast.currentDayDetails} />
      <UpcomingDaysForecast days={forecast.upcomingDays} />
    </div>
  </div>
);

Forecast.propTypes = {
  forecast: PropTypes.shape({
    currentDay: PropTypes.object,
    currentDayDetails: PropTypes.array,
    upcomingDays: PropTypes.array,
  }),
};
export default Forecast;
