// 리듀서들을 묶어준다.
import { combineReducers } from "redux";
import loginReducers from "./loginReducer";
import signupReducers from "./signupReducer";
import mappingReducer from "./mappingReducer";
import petReducer from "./petReducer";


const rootReducer = combineReducers({
  login: loginReducers,
  signup: signupReducers,
  mapping: mappingReducer,
  pet: petReducer
});

export default rootReducer;
