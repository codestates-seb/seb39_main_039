import { JOIN_SUCCESS } from "../actions/signupActions" 
//초기값
const initialstate = {
    isLogin : false,
    id : "",
}

const loginReducers = (state = initialstate, action) => {
    //타입, 페이로드 => 받아오는 데이터 값
    switch(action.type){
        case JOIN_SUCCESS:
            return{//객체로 내보내기
                isLogin: true,
                id: action.payload,
            }
        default:
            return state;
    }
}

export default loginReducers