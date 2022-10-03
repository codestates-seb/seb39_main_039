import {
  GET_WALKER_WALK_HISTORY_SUCCESS,
  GET_WALKER_WALK_WAITING_SUCCESS,
  RESET_WALKER_SUCCESS,
  WALKER_LOADING
} from "../actions/walkerActions";
//초기값
const initialstate = {
  walkerWalkHistory: [],
  walkerWalkWaiting: [],
  totalPage_history: "",
  totalPage_waiting: "",

  loading: ""
};

const walkerReducers = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_WALKER_WALK_HISTORY_SUCCESS:
      return {
        walkerWalkHistory: [
          ...state.walkerWalkHistory,
          ...payload.walkerWalkHistory
        ],
        totalPage_history: payload.totalPage_history
      };
    case GET_WALKER_WALK_WAITING_SUCCESS:
      return {
        walkerWalkWaiting: [
          ...state.walkerWalkWaiting,
          ...payload.walkerWalkWaiting
        ],
        totalPage_waiting: payload.totalPage_waiting
      };
    case RESET_WALKER_SUCCESS:
      return {
        ...state,
        walkerWalkHistory: payload.walkerWalkHistory,
        walkerWalkWaiting: payload.walkerWalkWaiting
      };
    default:
      return state;
  }
};

export default walkerReducers;
