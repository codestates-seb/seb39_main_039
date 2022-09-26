import {
  GET_ALL_WANTED_LIST_SUCCESS,
  GET_SCROLL_ALL_WANTED_LIST_SUCCESS,
  GET_WANTED_DETAIL_SUCCESS,
  WANTED_LOADING,
  RESET_WANTED_LIST_SUCCESS
} from "../actions/wantedActions";

const initialstate = {
  allWantedList: [],
  scrollOptionList: [],
  wantedDetail: [],
  scrollAllWantedList: [],
  totalPage: "",
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
        allWantedList: payload.allWantedList,
        totalPage: payload.totalPage,
        scrollOptionList: state.scrollAllWantedList
      };
    case GET_SCROLL_ALL_WANTED_LIST_SUCCESS:
      return {
        ...state,
        scrollAllWantedList: [
          // ...state.scrollAllWantedList,
          ...state.scrollAllWantedList,
          ...payload.scrollAllWantedList
        ],
        totalPage: payload.totalPage
      };
    case RESET_WANTED_LIST_SUCCESS:
      return {
        ...state,
        scrollAllWantedList: []
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
