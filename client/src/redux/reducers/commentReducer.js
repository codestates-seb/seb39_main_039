import { COMMENT_SELECT_ERROR, GET_CONTACT_INFO_SUCCESS } from "../actions/commentActions";

  const initialstate = {
    selectError: null
  };
  
  const commentReducers = (state = initialstate, action) => {
    switch (action.type) {
      case COMMENT_SELECT_ERROR:
        return {
          ...state,
          selectError: action.payload
       };
      case GET_CONTACT_INFO_SUCCESS:
        return {
          ...state,
          contactInfo: action.payload
      };
      default:
        return state;
    }
  };
  
  export default commentReducers;
  