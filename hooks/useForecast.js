import * as React from "react";
import axios from "axios";
import moment from "moment";

const BASE_URL = "https://www.metaweather.com/api/location";
const CROSS_DOMAIN = "https://the-ultimate-api-challenge.herokuapp.com";
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const currentDayForecast = (data) => [
  {
    name: "predictability",
    value: data.predictability,
    unit: "%",
  },
  {
    name: "humidity",
    value: data.humidity,
    unit: "%",
  },
  {
    name: "wind",
    value: Math.round(data.wind_speed),
    unit: "km/h",
  },
  {
    name: "air pressure",
    value: data.air_pressure,
    unit: "mb",
  },
  {
    name: "max temp",
    value: Math.round(data.max_temp),
    unit: "°C",
  },
  {
    name: "min temp",
    value: Math.round(data.min_temp),
    unit: "°C",
  },
];

const getCurrentDayForecast = (data, title) => ({
  weekday: moment(data.applicable_date).format("dddd"),
  date: moment(data.applicable_date).format("MMMM Do"),
  location: title,
  temperature: Math.round(data.the_temp),
  weatherIcon: `'https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`,
  weatherDescription: data.weather_state_name,
});

const getWeekday = (date) => moment(date).format("dddd").substring(0, 3);

const getUpcomingDaysForecast = (data) =>
  data.slice(1).map((day) => ({
    imgUrl: day.weather_state_abbr,
    temperature: Math.round(day.max_temp),
    weekday: getWeekday(day.applicable_date),
  }));

const useForecast = () => {
  const [isError, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [forecast, setForecast] = React.useState(null);

  const getWoeid = async (location) => {
    const { data } = await axios(`${REQUEST_URL}/search`, {
      params: { query: location },
    });

    if (!data || data.length === 0) {
      setError("There is no such location");
      setLoading(false);
      return;
    }

    return data[0];
  };

  const getForecastData = async (woeid) => {
    const { data } = await axios(`${REQUEST_URL}/${woeid}`);

    if (!data || data.length === 0) {
      setError("Something went wrong");
      setLoading(false);
      return;
    }

    return data;
  };

  const gatherForecastData = (data) => {
    const currentDay = getCurrentDayForecast(
      data.consolidated_weather[0],
      data.title
    );
    const currentDayDetails = currentDayForecast(data.consolidated_weather[0]);
    const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

    console.log(currentDay, currentDayDetails, upcomingDays);
    setForecast({ currentDay, currentDayDetails, upcomingDays });
    setLoading(false);
  };

  const submitRequest = async (location) => {
    setLoading(true);
    setError(false);

    const response = await getWoeid(location);
    if (!response?.woeid) return;

    const data = await getForecastData(response.woeid);
    if (!data) return;

    gatherForecastData(data);
  };

  return {
    isError,
    isLoading,
    forecast,
    submitRequest,
  };
};

export default useForecast;
