import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} from "../actions/loginActions";
//초기값
const initialstate = {
  isLogin: true,
  err: null
};

const loginReducers = (state = initialstate, action) => {
  //타입, 페이로드 => 받아오는 데이터 값
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        //객체로 내보내기
        ...state,
        isLogin: true,
        err: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        err: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};

export default loginReducers;
