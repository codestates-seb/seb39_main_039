import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/loginActions" 
//초기값
const initialstate = {
    isLogin : false
}

const loginReducers = (state = initialstate, action) => {
    //타입, 페이로드 => 받아오는 데이터 값
    switch(action.type){
        case LOGIN_SUCCESS:
            return{//객체로 내보내기
                isLogin: true
            }
        case LOGOUT_SUCCESS:
            return{
                isLogin: false
            }
        default:
            return { 
                ...state 
            };
    }
}

export default loginReducers