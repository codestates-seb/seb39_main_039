import {
  GET_PET_WALK_HISTORY_SUCCESS,
  GET_PET_WALK_PENDING_SUCCESS,
  } from "../actions/petwalkActions";
  
  const initialstate = {
    petWalkInfo: [],
    petWalkPendingInfo: [],
  };
  
  const petwalkReducer = (state = initialstate, action) => {
    let { type, payload } = action;
    switch (type) {
      case GET_PET_WALK_HISTORY_SUCCESS:
        return {
          ...state,
          petWalkInfo: payload.petWalkInfo
        };
      case GET_PET_WALK_PENDING_SUCCESS:
        return {
          ...state,
          petWalkPendingInfo: payload.petWalkPendingInfo
        };
      default:
        return state;
    }
  };
  
  export default petwalkReducer;
  