import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Weather from "./Weather";
import { getCurrentCityWeather } from "../redux/actions/weatherActions";

const WeatherContainer = () => {
  const dispatch = useDispatch();

  const { weatherLoading, currentWeather } = useSelector(
    (state) => state.weather
  );

  const getCurrentCity = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      return dispatch(getCurrentCityWeather(lat, lon));
    });
  };

  useEffect(() => {
    getCurrentCity();
  }, []);

  return <Weather loading={weatherLoading} currentWeather={currentWeather} />;
};

export default WeatherContainer;
