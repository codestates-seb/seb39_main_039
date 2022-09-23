import {
  GET_ALL_WANTED_LIST_SUCCESS,
  GET_WANTED_DETAIL_SUCCESS,
  WANTED_LOADING
} from "../actions/wantedActions";

const initialstate = {
  allWantedList: [],
  wantedDetail: [],
  loading: ""
};

const wantedReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case WANTED_LOADING:
      return {
        ...state,
        loading: payload.loading
      };
    case GET_ALL_WANTED_LIST_SUCCESS:
      return {
        ...state,
        allWantedList: payload.allWantedList
      };
    case GET_WANTED_DETAIL_SUCCESS:
      return {
        ...state,
        wantedDetail: payload.wantedDetail
      };
    default:
      return state;
  }
};

export default wantedReducer;
