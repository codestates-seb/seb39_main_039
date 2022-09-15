import {
  GET_LOCATION_SUCCESS,
  GET_WALK_STATE_SUCCESS,
  GET_LOCATION_REQUEST,
  GET_WALK_DETAIL_INFO_SUCCESS
} from "../actions/mappingAction";

const initialstate = {
  loading: true,
  lat: "",
  lon: "",
  isWalk: false,
  walkDetailInfo: []
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
    case GET_WALK_STATE_SUCCESS:
      return {
        ...state,
        isWalk: action.payload.isWalk
      };
    case GET_WALK_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        walkDetailInfo: action.payload.walkDetailInfo
      };
    default:
      return { ...state };
  }
};

export default mappingReducer;
