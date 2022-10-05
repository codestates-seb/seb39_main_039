import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Weather from "./Weather";
import { getCurrentCityWeather } from "../redux/actions/weatherActions";

const WeatherContainer = () => {
  const dispatch = useDispatch();

  const { weatherLoading, currentWeather } = useSelector(
    (state) => state.weather
  );

  let lat = localStorage.getItem("lat");
  let lon = localStorage.getItem("lon");

  useEffect(() => {
    if (lat && lon) dispatch(getCurrentCityWeather(lat, lon));
  }, [lat, lon]);

  return <Weather loading={weatherLoading} currentWeather={currentWeather} />;
};

export default WeatherContainer;
