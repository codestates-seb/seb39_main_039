import { GET_WEATHER_PENDING, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE } from "../actions/weatherActions";

const initialstate = {
  pending: false,
  error: false,
  data: {
    area: "",
    temp: 0,
    weather: "",
  },
}

const weatherReducer = (state = initialstate, action) => {
  let { type, payload } = action;
    switch (type) {
      case GET_WEATHER_PENDING:
        return {
          ...state,
          pending: true,
          error: false,
      };
      case GET_WEATHER_SUCCESS:
        return {
          ...state,
          pending: false,
          data: {
            area: payload.name,
            temp: payload.main.temp,
            weather: payload.weather[0].main,
          },
        };
      case GET_WEATHER_FAILURE:
        return {
          ...state,
          pending: true,
          error: false,
      };
      default:
        return state;
    }
};

export default weatherReducer