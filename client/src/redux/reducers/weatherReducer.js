import {
  GET_WEATHER_PENDING,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
} from "../actions/weatherActions";

const initialstate = {
  weatherLoading: true,
  currentWeather: {}
};

export const weatherReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_WEATHER_PENDING:
      return {
        ...state,
        weatherLoading: true
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeather: payload.currentWeather,
        weatherLoading: false
      };
    case GET_WEATHER_FAILURE:
      return {
        ...state,
        weatherLoading: false
      };
    default:
      return state;
  }
};

export default weatherReducer;
