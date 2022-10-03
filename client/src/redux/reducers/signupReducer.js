import { JOIN_SUCCESS, JOIN_ERROR } from "../actions/signupActions" 
//초기값
const initialstate = {
    isSignedUp : false,
    err : '',
}

const signupReducers = (state = initialstate, action) => {
    switch(action.type){
        case JOIN_SUCCESS:
            return{
                isSignedUp: true,
            }
        case JOIN_ERROR:
            return{
                err: action.payload,
            }
        default:
            return state;
    }
}

export default signupReducers