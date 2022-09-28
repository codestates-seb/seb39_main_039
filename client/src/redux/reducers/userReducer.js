import {
  GET_USER_INFO_SUCCESS,
  DELETE_USER_SUCCESS,
  USER_LOADING,
  GET_WALKER_USER_INFO
} from "../actions/userActions";

const initialstate = {
  isLogin: false,
  userInfo: [],
  walkerUserInfo: [],
  loading: ""
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
      return {
        ...state,
        isLogin: false
      };
    case GET_WALKER_USER_INFO:
      return {
        ...state,
        walkerUserInfo: payload.walkerUserInfo
      };
    case USER_LOADING:
      return {
        ...state,
        loading: payload.loading
      };

    default:
      return state;
  }
};

export default userReducer;
