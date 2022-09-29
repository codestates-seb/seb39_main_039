import {
  GET_PET_WALK_HISTORY_SUCCESS,
  GET_PET_WALK_PENDING_SUCCESS,
  PET_WALK_LOADING,
  RESET_PET_WALK_SUCCESS
} from "../actions/petwalkActions";

const initialstate = {
  petWalkInfo: [],
  petWalkPendingInfo: [],
  totalPage_history: "",
  totalPage_pending: "",
  petWalkLoading: ""
};

const petwalkReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case PET_WALK_LOADING:
      return {
        ...state,
        petWalkLoading: payload.petWalkLoading
      };
    case GET_PET_WALK_HISTORY_SUCCESS:
      return {
        ...state,
        petWalkInfo: [...state.petWalkInfo, ...payload.petWalkInfo],
        totalPage_history: payload.totalPage_history
      };
    case RESET_PET_WALK_SUCCESS:
      return {
        ...state,
        petWalkPendingInfo: payload.petWalkPendingInfo,
        petWalkInfo: payload.petWalkInfo
      };
    case GET_PET_WALK_PENDING_SUCCESS:
      return {
        ...state,
        petWalkPendingInfo: [
          ...state.petWalkPendingInfo,
          ...payload.petWalkPendingInfo
        ],
        totalPage_pending: payload.totalPage_pending
      };

    default:
      return state;
  }
};

export default petwalkReducer;
