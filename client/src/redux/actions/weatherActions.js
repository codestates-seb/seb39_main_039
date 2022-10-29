import { weatherAxios } from "../axiosAPI";

export const GET_WEATHER_PENDING = "GET_WEATHER_PENDING";
export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
export const GET_WEATHER_FAILURE = "GET_WEATHER_FAILURE";

const WEATHER_API = process.env.REACT_APP_WEATHER_API;

export const getCurrentCityWeather = (lat, lon) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: "GET_WEATHER_PENDING" });
      const currentCityApi = weatherAxios.get(
        `/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric&lang=kr`
      );
      let currentCity = await currentCityApi;
      dispatch({
        type: "GET_WEATHER_SUCCESS",
        payload: {
          currentWeather: currentCity.data,
        },
      });
    } catch (err) {
      dispatch({ type: "GET_WEATHER_FAILURE" });
    }
  };
};
