import { COMMENT_SELECT_ERROR } from "../actions/commentActions";

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
      default:
        return state;
    }
  };
  
  export default commentReducers;
  