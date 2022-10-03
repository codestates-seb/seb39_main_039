import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Weather from "./Weather";
import { getWeather } from "../redux/actions/weatherActions";

const WeatherContainer = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(({ weather }) => ({
    data: weather.data,
    loading: weather.loading,
    error: weather.error,
  }));

  useEffect(() => {
    getWeatherData();
  }, [])
  

  const getWeatherData = () => {
    dispatch(getWeather());
  }

  return (
    <Weather
      data={data}
      error={error}
      loading={loading}
      getWeatherData={getWeatherData}
    />
  );
};

export default WeatherContainer;