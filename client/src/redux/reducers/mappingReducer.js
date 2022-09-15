import {
  GET_LOCATION_SUCCESS,
  GET_WALKSTATE_SUCCESS,
  GET_LOCATION_REQUEST
} from "../actions/mappingAction";

const initialstate = {
  loading: true,
  lat: "",
  lon: "",
  isWalk: false
};

const mappingReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return { ...state, loading: true };

    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        lat: action.payload.lat,
        lon: action.payload.lon,
        loading: false
      };
    case GET_WALKSTATE_SUCCESS:
      return {
        ...state,
        isWalk: action.payload.isWalk
      };
    default:
      return { ...state };
  }
};

export default mappingReducer;
