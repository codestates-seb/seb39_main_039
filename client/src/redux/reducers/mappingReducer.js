import { GET_LOCATION_SUCCESS } from "../actions/mappingAction";

const initialstate = {
  lat: "",
  lon: ""
};

const mappingReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return {
        lat: action.payload.lat,
        lon: action.payload.lon
      };
    default:
      return state;
  }
};

export default mappingReducer;
