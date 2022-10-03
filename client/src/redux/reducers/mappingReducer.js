import {
  GET_LOCATION_SUCCESS,
  GET_WALK_STATE_SUCCESS,
  GET_LOCATION_REQUEST,
  GET_WALK_DETAIL_INFO_SUCCESS,
  CLOSE_WALK_SUCCESS,
  GET_WALKING_PET_PICTURE
} from "../actions/mappingAction";

const initialstate = {
  loading: true,
  lat: "",
  lon: "",
  isWalk: false,
  walkDetailInfo: [],
  closeWalklInfo: [],
  walkingPetPicture: []
};

const mappingReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_LOCATION_REQUEST:
      return { ...state, loading: true };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        lat: payload.lat,
        lon: payload.lon,
        loading: false
      };
    case GET_WALK_STATE_SUCCESS:
      return {
        ...state,
        isWalk: payload.isWalk
      };
    case GET_WALK_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        walkDetailInfo: payload.walkDetailInfo
      };
    case CLOSE_WALK_SUCCESS:
      return {
        ...state,
        closeWalklInfo: payload.closeWalklInfo
      };
    case GET_WALKING_PET_PICTURE:
      return {
        ...state,
        walkingPetPicture: payload.walkingPetPicture
      };
    default:
      return { ...state };
  }
};

export default mappingReducer;
