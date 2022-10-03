import { GET_CITY_INFO_SUCCESS } from "../actions/cityActions";

const initialstate = {
    cityInfo: [],
  };

const cityReducer = (state = initialstate, action) => {
let { type, payload } = action;
    switch (type) {
      case GET_CITY_INFO_SUCCESS:
        return {
          ...state,
          cityInfo: payload.cityInfo
        };
      default:
        return state;
    }
};
  
export default cityReducer;