import {
    GET_PET_WALK_SUCCESS,
  } from "../actions/petwalkActions";
  
  const initialstate = {
    petWalkInfo: []
  };
  
  const petwalkReducer = (state = initialstate, action) => {
    let { type, payload } = action;
    switch (type) {
      case GET_PET_WALK_SUCCESS:
        return {
          ...state,
          petWalkInfo: payload.petWalkInfo
        };
      default:
        return state;
    }
  };
  
  export default petwalkReducer;
  