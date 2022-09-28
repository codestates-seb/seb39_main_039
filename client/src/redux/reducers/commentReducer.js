import { COMMENT_SELECT_ERROR, GET_CONTACT_INFO_SUCCESS, COMMENT_ADD_ERROR } from "../actions/commentActions";

  const initialstate = {
    selectError: null,
    contactInfo: '',
    addError: null,
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
      case COMMENT_ADD_ERROR:
        return {
          ...state,
          addError: action.payload
      };
      default:
        return state;
    }
  };
  
  export default commentReducers;
  