import { GET_USER_INFO_SUCCESS } from "../actions/userActions";

const initialstate = {
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
    default:
      return state;
  }
};

export default userReducer;
