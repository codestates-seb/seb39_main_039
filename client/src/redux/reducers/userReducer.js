import { GET_USER_INFO_SUCCESS, DELETE_USER_SUCCESS } from "../actions/userActions";

const initialstate = {
  isLogin:false,
  userInfo: []
};

const userReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: payload.userInfo
      };

    case DELETE_USER_SUCCESS:
      return{
        ...state,
        isLogin:false
      }
    default:
      return state;
  }
};

export default userReducer;
