import {
  GET_RECOMMEND_REQUEST,
  GET_RECOMMEND_DATA,
  GET_LOCATION_DATA,
  GET_LOCATION_REQUEST
} from "../actions/recommendAction";
//초기값
const initialstate = {
  recommendData: [],
  location: [],
  recommendLoading: true,
  locationLoading: true
};

const recommendReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_RECOMMEND_REQUEST:
      return {
        ...state,
        recommendLoading: true
      };
    case GET_LOCATION_REQUEST:
      return { ...state, locationLoading: true };
    case GET_RECOMMEND_DATA:
      return {
        ...state,
        recommendData: payload.recommendData,
        recommendLoading: false
      };
    case GET_LOCATION_DATA:
      return {
        ...state,
        location: payload.location,
        locationLoading: false
      };
    default:
      return state;
  }
};

export default recommendReducer;
