import axios from "axios";

export const GET_WEATHER_PENDING = "GET_WEATHER_PENDING";
export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
export const GET_WEATHER_FAILURE = "GET_WEATHER_FAILURE";

function getAPI() {
  return axios.get(
    "http://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&APPID=324513571d06ac1bf9fd9c40a825adac"
  );
}

export const getWeather = () => async (dispatch) => {
  dispatch({ type: GET_WEATHER_PENDING });

  try {
    const response = await getAPI();
    dispatch({
      type: GET_WEATHER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_WEATHER_FAILURE,
      payload: err,
    });
    throw err;
  }
};