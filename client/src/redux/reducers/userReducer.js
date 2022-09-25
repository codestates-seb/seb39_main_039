import { GET_USER_INFO_SUCCESS, DELETE_USER_SUCCESS, USER_LOADING } from "../actions/userActions";

const initialstate = {
  isLogin:false,
  userInfo: [],
  loading: ''
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
